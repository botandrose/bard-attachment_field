import FormController from "./form-controller"

function createForm() {
  const form = document.createElement("form")
  document.body.appendChild(form)
  return form
}

afterEach(() => {
  document.body.innerHTML = ""
})

describe("FormController", () => {
  describe("default (uploadDialog: true)", () => {
    it("creates the upload-dialog element", () => {
      const form = createForm()
      const controller = FormController.instance(form)
      expect(controller.dialog).toBeTruthy()
      expect(controller.dialog.tagName.toLowerCase()).toBe("upload-dialog")
      expect(form.querySelector("#form-controller-dialog")).toBeTruthy()
    })
  })

  describe("uploadDialog: false", () => {
    it("does not create the dialog", () => {
      const form = createForm()
      const controller = FormController.instance(form, { uploadDialog: false })
      expect(controller.dialog).toBeFalsy()
      expect(form.querySelector("#form-controller-dialog")).toBeNull()
    })

    it("still registers event listeners and queues controllers", () => {
      const form = createForm()
      FormController.instance(form, { uploadDialog: false })

      const uploadedFile = document.createElement("div")
      form.appendChild(uploadedFile)
      const mockController = { start: jest.fn(cb => cb(null)), uploadedFile }
      form.dispatchEvent(new CustomEvent("direct-upload:initialize", {
        detail: { id: 1, file: { name: "test.jpg" }, controller: mockController },
      }))

      expect(mockController.start).toHaveBeenCalled()
    })

    it("does not create progress bars on init", () => {
      const form = createForm()
      FormController.instance(form, { uploadDialog: false })

      const uploadedFile = document.createElement("div")
      form.appendChild(uploadedFile)
      const mockController = { start: jest.fn(cb => cb(null)), uploadedFile }
      form.dispatchEvent(new CustomEvent("direct-upload:initialize", {
        detail: { id: 1, file: { name: "test.jpg" }, controller: mockController },
      }))

      expect(form.querySelector("progress-bar")).toBeNull()
    })
  })
})
