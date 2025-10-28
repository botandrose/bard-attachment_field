import { AttachmentFile } from './attachment-file'

export default class Accepts {
  uploadedFile: AttachmentFile

  constructor(uploadedFile) {
    this.uploadedFile = uploadedFile
  }

  get errors() {
    if(this.#errors) return this.#errors
    this.#errors = []

    const accepts = this.uploadedFile.accepts ? this.uploadedFile.accepts.split(/,\s*/) : []

    if(accepts.length > 0 && !accepts.includes(this.uploadedFile.filetype)) {
      this.#errors.push(`Must be a ${this.joinWords(accepts)}.`)
    }
    return this.#errors
  }

  #errors: Array<string>

  private joinWords(words) {
    if(words.length >= 3) {
      return (words.slice(0, -1) + [`or ${words.at(-1)}`]).join(", ")
    } else {
      return words.join(" or ")
    }
  }
}

