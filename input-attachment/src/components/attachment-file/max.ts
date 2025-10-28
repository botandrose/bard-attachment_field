import { AttachmentFile } from './attachment-file'

export default class Max {
  uploadedFile: AttachmentFile

  constructor(uploadedFile) {
    this.uploadedFile = uploadedFile
  }

  get errors() {
    if(this.#errors) return this.#errors
    this.#errors = []
    if(!this.checkValidity()) {
      this.#errors.push(this.errorMessage)
    }
    return this.#errors
  }

  #errors: Array<string>

  checkValidity() {
    if(!this.uploadedFile.max) return true
    return this.uploadedFile.size <= this.uploadedFile.max
  }

  get errorMessage() {
    return [
      `Must be smaller than ${this.formatBytes(this.uploadedFile.max)},`,
      `and "${this.uploadedFile.filename}" is ${this.formatBytes(this.uploadedFile.size)}.`,
      `Please attach a smaller file.`,
    ].join(" ")
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  }
}

