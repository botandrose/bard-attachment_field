import DirectUploadController from "../attachment-file/direct-upload-controller"
import "../upload-dialog/upload-dialog"

export default class FormController {
  static instance(form, options = {}) {
    return form.inputAttachmentFormController ||= new FormController(form, options)
  }

  dialog: HTMLElement

  element: HTMLFormElement
  controllers: Array<DirectUploadController>
  submitted: boolean
  processing: boolean

  constructor(form, { uploadDialog = true } = {}) {
    this.element = form
    this.controllers = []
    this.submitted = false
    this.processing = false

    if (uploadDialog) {
      this.dialog = document.createElement("upload-dialog")
      this.dialog.id = "form-controller-dialog"
      this.element.appendChild(this.dialog)
    }

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
      (this.dialog as any)?.open()
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
      (this.dialog as any)?.close()
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
    ;(this.dialog as any)?.addUpload(`direct-upload-${id}`, file?.name || "Uploading...")
    this.controllers.push(controller)
    this.startNextController()
  }

  start(event) {
    ;(this.dialog as any)?.startUpload(`direct-upload-${event.detail.id}`)
  }

  progress(event) {
    const { id, progress } = event.detail
    ;(this.dialog as any)?.updateProgress(`direct-upload-${id}`, progress)
  }

  error(event) {
    event.preventDefault()
    const { id, error } = event.detail
    ;(this.dialog as any)?.setError(`direct-upload-${id}`, error)
  }

  end(event) {
    ;(this.dialog as any)?.completeUpload(`direct-upload-${event.detail.id}`)
  }

  removeUploadedFile(event) {
    const uploadedFile = event.detail
    const id = uploadedFile.controller?.directUpload?.id
    if(id) {
      (this.dialog as any)?.removeUpload(`direct-upload-${id}`)
    }
    this.setInputAttachmentsDisabled(false)
    requestAnimationFrame(() => this.submitForm())
  }
}
