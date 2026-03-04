import { Component, Element, Prop, Listen, Host, h, forceUpdate } from '@stencil/core';
import FormController from "./form-controller"
import { arrayRemove } from "../../utils/utils"
import '@botandrose/file-drop'
import '@botandrose/progress-bar'

@Component({
  tag: 'input-attachment',
  styleUrl: 'input-attachment.css',
  shadow: true,
  formAssociated: true,
})
export class InputAttachment {
  @Element() el: HTMLElement

  @Prop() name: string
  @Prop() directupload: string
  @Prop() multiple: boolean = false

  @Prop() required: boolean = false
  @Prop() accepts: string
  @Prop() max: number
  @Prop() preview: boolean = true
  @Prop() disabled: boolean = false


  form: HTMLFormElement
  internals: ElementInternals
  fileInput: HTMLInputElement
  _files: Array<any> = []

  constructor() {
    this.internals = (this.el as any).attachInternals()
  }

  componentWillLoad() {
    this.form = this.internals.form
    if (this.form) {
      this.form.addEventListener("reset", () => this.reset())
      FormController.instance(this.form)
    }

    // Note: Server-rendered children may not be available yet during componentWillLoad
    // when using lazy-loaded Stencil components. We'll check again in componentDidRender.
    const existingFiles = Array.from(this.el.children).filter(e => e.tagName == "ATTACHMENT-FILE");
    if(existingFiles.length > 0) this.files = existingFiles

    // Restore from localStorage BEFORE setting initial validity (which triggers saveToLocalStorage)
    this.restoreFromLocalStorage()

    // Set initial validity state (only if we have files from above)
    if(this.files.length > 0) this.updateFormValue()
  }

  componentDidLoad() {
    // Clear persistence data when form is submitted
    if (this.form) {
      this.form.addEventListener('submit', () => this.clearLocalStorage())
    }

    // Listen for file input changes directly (JSX onChange doesn't reliably work in shadow DOM)
    this.fileInput?.addEventListener('change', this.handleFileInputChange)
  }

  get localStorageKey() {
    if (!this.form || !this.name) return null
    const formId = this.form.id || this.form.action || 'form'
    return `input-attachment:${formId}:${this.name}`
  }

  saveToLocalStorage() {
    const key = this.localStorageKey
    if (!key) return

    const data = this.persistenceData
    if (data.length > 0) {
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      localStorage.removeItem(key)
    }
  }

  restoreFromLocalStorage() {
    const key = this.localStorageKey
    if (!key || this.files.length > 0) return

    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const data = JSON.parse(stored)
        if (Array.isArray(data) && data.length > 0) {
          this.restoreFromPersistence(data)
        }
      }
    } catch (e) {
      // Invalid JSON, ignore
    }
  }

  clearLocalStorage() {
    const key = this.localStorageKey
    if (key) {
      localStorage.removeItem(key)
    }
  }

  // Methods

  get files() {
    return this._files
  }

  set files(val) {
    this._files = val
    if(!this.multiple) this._files = this._files.slice(-1)
    forceUpdate(this.el)
    this.fireChangeEvent()
  }

  get value() {
    return this.files.map(e => e.value)
  }

  set value(val) {
    const newValue = val || []
    if(JSON.stringify(this.value) !== JSON.stringify(newValue)) { // this is insane. javascript is fucking garbage.
      this.files = newValue.map(signedId => {
        const attachmentFile = document.createElement('attachment-file') as any
        attachmentFile.name = this.name
        attachmentFile.preview = this.preview
        attachmentFile.signedId = signedId
        return attachmentFile
      })
    }
  }

  // For form-persistence: store complete attachment data (not just signed_ids)
  get persistenceData() {
    return this.files.map(f => ({
      value: f.value,
      filename: f.filename,
      src: f.src,
      state: f.state,
      percent: f.percent,
      size: f.size,
      filetype: f.filetype,
    }))
  }

  restoreFromPersistence(data: any[]) {
    if (!Array.isArray(data) || data.length === 0) return

    this.files = data.map(item => {
      const attachmentFile = document.createElement('attachment-file') as any
      attachmentFile.name = this.name
      attachmentFile.preview = this.preview
      attachmentFile.value = item.value
      attachmentFile.filename = item.filename
      attachmentFile.src = item.src
      attachmentFile.state = item.state || 'complete'
      attachmentFile.percent = item.percent || 100
      attachmentFile.size = item.size
      attachmentFile.filetype = item.filetype
      return attachmentFile
    })
    requestAnimationFrame(() => this.componentDidRender())
  }

  updateFormValue() {
    if (!this.name || !this.internals?.setFormValue) return
    const formData = new FormData()
    const values = this.value.filter(v => v) // filter out empty values
    if (this.multiple) {
      // For has_many_attached: append each signed_id separately
      values.forEach(signedId => formData.append(this.name, signedId))
      // If empty, append empty string so Rails gets an empty array
      if (values.length === 0) formData.append(this.name, '')
    } else {
      // For has_one_attached: set single value (or empty string if none)
      formData.set(this.name, values[0] || '')
    }
    this.internals.setFormValue(formData)

    // Save to localStorage for persistence across page reloads
    this.saveToLocalStorage()

    // Update validity state - check for required and child validation errors
    if (this.required && this.files.length === 0) {
      this.internals.setValidity({ valueMissing: true }, "Please select a file.", this.fileInput)
    } else {
      // Check if any child attachment-file has validation errors
      const childErrors = this.files
        .map(f => f.validationError)
        .filter(e => e && e.length > 0)
      if (childErrors.length > 0) {
        this.internals.setValidity({ customError: true }, childErrors[0], this.fileInput)
      } else {
        this.internals.setValidity({})
      }
    }
  }

  reset() {
    this.value = []
    this.clearLocalStorage()
  }

  handleFileInputChange = () => {
    if (!this.fileInput?.files?.length) return
    this.addFiles(this.fileInput.files)
    this.fileInput.value = null
  }

  handleDrop = (event: DragEvent) => {
    event.preventDefault()
    if (this.isDisabled) return
    if (event.dataTransfer?.files?.length) {
      this.addFiles(event.dataTransfer.files)
    }
  }

  @Listen("attachment-file:remove")
  removeUploadedFile(event) {
    arrayRemove(this.files, event.detail)
    this.files = this.files
  }

  @Listen("attachment-file:validation")
  handleChildValidation(_event) {
    // Re-check form validity when a child's validation state changes
    this.updateFormValue()
  }

  @Listen("attachment-file:ready")
  handleChildReady(_event) {
    this.updateFormValue()
  }

  @Listen("direct-upload:end")
  fireChangeEvent() {
    requestAnimationFrame(() => {
      this.updateFormValue()
      this.el.dispatchEvent(new Event("change", { bubbles: true }))
    })
  }

  // Rendering

  get isDisabled() {
    return this.disabled || !!this.el.closest('fieldset[disabled]')
  }

  render() {
    return (
      <Host>
        <input
          ref={el => this.fileInput = el}
          type="file"
          multiple={this.multiple}
          accept={this.accepts}
          required={this.required && this.files.length === 0}
          disabled={this.isDisabled}
          onChange={() => this.handleFileInputChange()}
          style={{
            opacity: '0.01',
            width: '1px',
            height: '1px',
            zIndex: '-999'
          }}
        />
        <file-drop onClick={() => this.fileInput?.click()} onDrop={this.handleDrop}>
          <p part="title">
            <strong>Choose {this.multiple ? "files" : "file"} </strong>
            <span>or drag {this.multiple ? "them" : "it"} here.</span>
          </p>

          <div class={`media-preview ${this.multiple ? '-stacked' : ''}`}>
            <slot></slot>
          </div>
        </file-drop>
      </Host>
    )
  }

  componentDidRender() {
    // Check for server-rendered children that we haven't captured yet
    // This handles the case where children aren't available in componentWillLoad
    if (this.files.length === 0) {
      const existingFiles = Array.from(this.el.children).filter(e => e.tagName == "ATTACHMENT-FILE");
      if (existingFiles.length > 0) {
        this._files = existingFiles as any[]
      }
    }

    const wrapper = document.createElement("div")
    this.files.forEach(file => wrapper.appendChild(file))

    let needsUpdate = false
    if (wrapper.children.length !== this.el.children.length) {
      needsUpdate = true
    } else {
      for (let i = 0; i < wrapper.children.length; i++) {
        if (wrapper.children[i] !== this.el.children[i]) {
          needsUpdate = true
          break
        }
      }
    }

    if (needsUpdate) {
      while (this.el.firstChild) {
        this.el.removeChild(this.el.firstChild)
      }
      this.el.appendChild(wrapper)
    }

    this.updateFormValue()
  }

  // Test helper - adds files programmatically with proper lifecycle
  addFiles(files: FileList | File[]) {
    const fileArray = Array.from(files)
    fileArray.forEach(file => {
      const attachmentFile = document.createElement('attachment-file') as any
      attachmentFile.name = this.name
      attachmentFile.preview = this.preview
      attachmentFile.setAttribute("url", this.directupload)
      attachmentFile.accepts = this.accepts
      attachmentFile.max = this.max
      attachmentFile.file = file
      this._files.push(attachmentFile)
    })
    this.files = this._files
    // Manually trigger DOM update since Stencil's state change may not re-render
    // when called from external JavaScript
    requestAnimationFrame(() => this.componentDidRender())
  }

  // Validations

  checkValidity() {
    if (this.required && this.files.length === 0) {
      return false
    }
    return true
  }

  setCustomValidity(msg: string) {
    this.internals.setValidity(msg ? { customError: true } : {}, msg, this.fileInput)
  }

  reportValidity() {
    return this.internals.reportValidity()
  }

  get validationMessage() {
    return this.internals.validationMessage
  }
}
