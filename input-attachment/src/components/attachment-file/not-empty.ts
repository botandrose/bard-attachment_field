import { AttachmentFile } from './attachment-file'

export default class NotEmpty {
  uploadedFile: AttachmentFile

  constructor(uploadedFile) {
    this.uploadedFile = uploadedFile
  }

  get errors() {
    if(this.#errors) return this.#errors
    this.#errors = []
    if(this.uploadedFile.size === 0) {
      this.#errors.push("Must be larger than 0 bytes.")
    }
    return this.#errors
  }

  #errors: Array<string>
}
