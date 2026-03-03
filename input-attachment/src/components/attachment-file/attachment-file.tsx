import { Component, Prop, Element, Watch, Host, h } from '@stencil/core'
import { Listen, Event, EventEmitter } from '@stencil/core'
import DirectUploadController from './direct-upload-controller'
import Max from './max'
import Accepts from './accepts'
import Extensions from './extensions'
import { get } from 'rails-request-json'

@Component({
  tag: 'attachment-file',
  styleUrl: 'attachment-file.css',
  shadow: true,
})
export class AttachmentFile {
  @Element() el

  @Prop({ reflect: true, mutable: true }) name: string
  @Prop({ reflect: true, mutable: true }) accepts: string
  @Prop({ reflect: true, mutable: true }) max: number
  @Prop({ reflect: true, mutable: true }) url: string

  @Prop({ reflect: true, mutable: true }) value: string = ""
  @Prop({ reflect: true, mutable: true }) filename: string
  @Prop({ reflect: true, mutable: true }) src: string
  @Prop({ reflect: true, mutable: true }) filetype: string
  @Prop({ reflect: true, mutable: true }) size: number
  @Prop({ reflect: true, mutable: true }) state: string = "complete"
  @Prop({ reflect: true, mutable: true }) percent: number = 100
  @Prop({ reflect: true, mutable: true }) preview: boolean = true

  @Prop() validationMessage: string

  @Event({ eventName: "attachment-file:remove" }) removeEvent: EventEmitter
  @Event({ eventName: "attachment-file:validation" }) validationEvent: EventEmitter

  private removeClicked = event => {
    event.stopPropagation()
    event.preventDefault()
    this.controller?.cancel()
    this.removeEvent.emit(this)
  }

  private retryClicked = event => {
    event.stopPropagation()
    event.preventDefault()
    this.state = "pending"
    this.percent = 0
    this.validationError = ""
    this.uploadError = ""
    this.controller = new DirectUploadController(this.el, this._file)
    this.controller.dispatch("initialize", { controller: this.controller })
  }

  controller: DirectUploadController
  _file: File
  validationError: string = ""
  uploadError: string = ""

  componentWillLoad() {
    this.setMissingFiletype()
  }

  get file() {
    return this._file
  }

  set file(file: any) {
    this.src = URL.createObjectURL(file)
    this.filename = file.name
    this.size = file.size
    this.state = "pending"
    this.percent = 0
    this._file = file
  }

  set signedId(val) {
    if(this.value !== val) {
      get(`/rails/active_storage/blobs/info/${val}`).then(blob => {
        this.src = `/rails/active_storage/blobs/redirect/${val}/${blob.filename}`
        this.filename = blob.filename
        this.size = blob.byte_size
        this.state = "complete"
        this.percent = 100
        this.value = val
      })
    }
  }

  @Watch("filename")
  setMissingFiletype(_value?, _previousValue?) {
    if(!this.filetype && this.filename) {
      this.filetype = Extensions.getFileType(this.filename)
    }
  }

  @Listen("direct-upload:initialize")
  @Listen("direct-upload:start")
  start(_event) {
    this.state = "pending"
    this.percent = 0
  }

  @Listen("direct-upload:progress")
  progress(event) {
    const { progress } = event.detail
    this.percent = progress
  }

  @Listen("direct-upload:error")
  error(event) {
    event.preventDefault()
    const { error } = event.detail
    this.state = "error"
    this.uploadError = error
  }

  @Listen("direct-upload:end")
  end(_event) {
    if(this.state !== "error") {
      this.state = "complete"
      this.percent = 100
    }
  }

  render() {
    return (
      <Host>
        <slot>
        </slot>
        <figure>
          <div class="progress-details">
            <progress-bar percent={this.percent} class={this.state}>
              <a class="download-link" href={this.src} download={this.filename} onClick={e => e.stopPropagation()}>
                {this.filename}
              </a>
            </progress-bar>
            <span class="progress-icon"></span>
            <a class="remove-media" onClick={this.removeClicked} href="#">
              <span>Remove media</span>
            </a>
            {this.uploadError && this._file ?
              <a class="retry-media" onClick={this.retryClicked} href="#">
                <span>Retry upload</span>
              </a>
            : ''}
          </div>
          {(this.validationError || this.uploadError) ? <p class="validation-error">{this.validationError || this.uploadError}</p> : ''}
          {this.preview ? <attachment-preview src={this.src} filetype={this.filetype}></attachment-preview> : ''}
        </figure>
      </Host>
    )
  }

  componentDidLoad() {
    if(this.state == "pending" && this._file) {
      if(this.checkValidity()) {
        this.controller = new DirectUploadController(this.el, this._file)
        this.controller.dispatch("initialize", { controller: this.controller })
      } else {
        this.state = "error"
      }
    }
  }

  checkValidity() {
    let errors = []
    errors.push(...new Accepts(this).errors)
    errors.push(...new Max(this).errors)
    this.validationError = errors.join(" ")
    // Notify parent of validation state change
    this.validationEvent.emit({ valid: errors.length === 0, error: this.validationError })
    return errors.length === 0
  }
}
