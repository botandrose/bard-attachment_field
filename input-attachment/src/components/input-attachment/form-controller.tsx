import DirectUploadController from "../attachment-file/direct-upload-controller"

export default class FormController {
  static instance(form) {
    return form.inputAttachmentFormController ||= new FormController(form)
  }

  progressContainerTarget: HTMLElement
  dialog: HTMLDialogElement

  element: HTMLFormElement
  progressTargetMap: {}
  controllers: Array<DirectUploadController>
  submitted: boolean
  processing: boolean

  constructor(form) {
    this.element = form
    this.progressTargetMap = {}
    this.controllers = []
    this.submitted = false
    this.processing = false

    this.element.insertAdjacentHTML("beforeend",
      `<dialog id="form-controller-dialog">
        <div class="direct-upload-wrapper">
          <div class="direct-upload-content">
            <h3>Uploading your media</h3>
            <div id="progress-container"></div>
          </div>
        </div>
      </dialog>`)

    this.dialog = this.element.querySelector("#form-controller-dialog")
    this.progressContainerTarget = this.dialog.querySelector("#progress-container")

    this.element.addEventListener("submit", event => this.submit(event))
    window.addEventListener("beforeunload", event => this.beforeUnload(event))

    this.element.addEventListener("direct-upload:initialize", event => this.init(event))
    this.element.addEventListener("direct-upload:start", event => this.start(event))
    this.element.addEventListener("direct-upload:progress", event => this.progress(event))
    this.element.addEventListener("direct-upload:error", event => this.error(event))
    this.element.addEventListener("direct-upload:end", event => this.end(event))

    this.element.addEventListener("attachment-file:remove", event => this.removeUploadedFile(event))
  }

  beforeUnload(event) {
    if(this.processing) {
      event.preventDefault()
      return (event.returnValue = "")
    }
  }

  submit(event) {
    if(this.controllers.length === 0 && !this.hasUploadErrors() && !this.processing) return
    event.preventDefault()
    this.submitted = true
    this.setInputAttachmentsDisabled(true)
    this.startNextController()
    if(this.processing) {
      this.dialog.showModal()
    }
  }

  startNextController() {
    if(this.processing) return

    const controller = this.controllers.shift()
    if(controller) {
      this.processing = true
      if (this.submitted) {
        this.setInputAttachmentsDisabled(true)
      } else {
        this.setControllerInputDisabled(controller, true)
      }
      controller.start(error => {
        if (this.submitted) {
          if(error) {
            this.setInputAttachmentsDisabled(false)
          }
        } else {
          this.setControllerInputDisabled(controller, false)
        }
        this.processing = false
        this.startNextController()
      })
    } else {
      this.submitForm()
    }
  }

  hasUploadErrors() {
    return Array.from(this.element.querySelectorAll("attachment-file"))
      .some((el: any) => el.state === "error")
  }

  submitForm() {
    if(!this.submitted) return
    if(this.hasUploadErrors()) {
      this.dialog.close()
      this.setInputAttachmentsDisabled(false)
      return
    }
    this.setInputAttachmentsDisabled(true)
    requestAnimationFrame(() => { // run after pending rAF callbacks (e.g. updateFormValue)
      this.element.submit()
    })
  }

  setControllerInputDisabled(controller: DirectUploadController, disabled: boolean) {
    const inputAttachment = (controller.uploadedFile as any).closest('input-attachment')
    if (inputAttachment) {
      inputAttachment.disabled = disabled
    }
  }

  setInputAttachmentsDisabled(disabled: boolean) {
    Array.from(this.element.querySelectorAll("input-attachment"))
      .forEach((el: any) => {
        el.disabled = disabled
      })
  }

  init(event) {
    const { id, file, controller } = event.detail

    this.progressContainerTarget.insertAdjacentHTML("beforebegin", `
      <progress-bar id="direct-upload-${id}" class="direct-upload--pending">${file?.name || 'Uploading...'}</progress-bar>
    `)
    const progressTarget = document.getElementById(`direct-upload-${id}`)
    this.progressTargetMap[id] = progressTarget

    this.controllers.push(controller)
    this.startNextController()
  }

  start(event) {
    this.progressTargetMap[event.detail.id].classList.remove("direct-upload--pending")
  }

  progress(event) {
    const { id, progress } = event.detail
    this.progressTargetMap[id].percent = progress
  }

  error(event) {
    event.preventDefault()
    const { id, error } = event.detail
    const target = this.progressTargetMap[id]
    target.classList.add("direct-upload--error")
    target.title = error
  }

  end(event) {
    this.progressTargetMap[event.detail.id].classList.add("direct-upload--complete")
  }

  removeUploadedFile(event) {
    const uploadedFile = event.detail
    const id = uploadedFile.controller?.directUpload?.id
    if(id) {
      document.getElementById(`direct-upload-${id}`).remove()
      delete this.progressTargetMap[id]
    }
    this.setInputAttachmentsDisabled(false)
    requestAnimationFrame(() => this.submitForm())
  }
}
