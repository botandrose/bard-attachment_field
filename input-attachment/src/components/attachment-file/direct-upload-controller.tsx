import { DirectUpload } from "@rails/activestorage"
import { AttachmentFile } from "./attachment-file"

export default class DirectUploadController {
  uploadedFile: AttachmentFile
  file: File
  directUpload: any
  recordXHR: XMLHttpRequest
  uploadXHR: XMLHttpRequest
  callback = null

  constructor(uploadedFile) {
    this.uploadedFile = uploadedFile
    this.file = this.uploadedFile["file"]
    this.directUpload = new DirectUpload(this.file, this.uploadedFile.url, this)
  }

  cancel() {
    this.directUpload.url = null
    this.abortXHR(this.recordXHR)
    this.abortXHR(this.uploadXHR)
  }

  abortXHR(xhr) {
    if(!xhr) return
    xhr.addEventListener("abort", () => {
      this.complete("aborted", {})
    })
    xhr.abort()
  }

  start(callback) {
    this.callback = callback
    this.dispatch("start")
    this.directUpload.create((error, attributes) => {
      this.complete(error, attributes)
    })
  }

  complete(error, _attributes) {
    if (error) {
      this.dispatchError(error)
    }
    this.dispatch("end")
    this.callback(error)
  }

  uploadRequestDidProgress(event) {
    const progress = event.loaded / event.total * 100;
    if (progress) {
      this.dispatch("progress", {
        progress: progress
      });
    }
  }
  dispatch(name, detail = {}) {
    return dispatchEvent(this.uploadedFile, `direct-upload:${name}`, {
      detail: {
        ...detail,
        file: this.file,
        id: this.directUpload.id,
      }
    });
  }
  dispatchError(error) {
    this.dispatch("error", {
      error: error
    })
  }
  directUploadWillCreateBlobWithXHR(xhr) {
    this.recordXHR = xhr
    this.dispatch("before-blob-request", {
      xhr: xhr
    });
  }
  directUploadWillStoreFileWithXHR(xhr) {
    this.uploadXHR = xhr
    this.uploadedFile.value = this.recordXHR.response.signed_id
    this.dispatch("before-storage-request", {
      xhr: xhr
    });
    xhr.upload.addEventListener("progress", (event => this.uploadRequestDidProgress(event)));
  }
}

function dispatchEvent(element: any, type, eventInit = {} as any) {
  const {disabled: disabled} = element;
  const {bubbles: bubbles, cancelable: cancelable, detail: detail} = eventInit;
  const event = document.createEvent("Event") as any;
  event.initEvent(type, bubbles || true, cancelable || true);
  event.detail = detail || {};
  try {
    element.disabled = false;
    element.dispatchEvent(event);
  } finally {
    element.disabled = disabled;
  }
  return event;
}

