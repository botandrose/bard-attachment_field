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
    it("creates the dialog and progress container", () => {
      const form = createForm()
      const controller = FormController.instance(form)
      expect(controller.dialog).toBeTruthy()
      expect(controller.progressContainerTarget).toBeTruthy()
      expect(form.querySelector("#form-controller-dialog")).toBeTruthy()
      expect(form.querySelector("#progress-container")).toBeTruthy()
    })
  })

  describe("uploadDialog: false", () => {
    it("does not create the dialog or progress container", () => {
      const form = createForm()
      const controller = FormController.instance(form, { uploadDialog: false })
      expect(controller.dialog).toBeFalsy()
      expect(controller.progressContainerTarget).toBeFalsy()
      expect(form.querySelector("#form-controller-dialog")).toBeNull()
      expect(form.querySelector("#progress-container")).toBeNull()
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
