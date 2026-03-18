import { Component, Host, Method, State, h } from "@stencil/core";
import "@botandrose/progress-bar";

interface UploadEntry {
  id: string;
  filename: string;
  pending: boolean;
  percent: number;
  complete: boolean;
  error: string | null;
}

@Component({
  tag: "upload-dialog",
  styleUrl: "upload-dialog.css",
  shadow: true,
})
export class UploadDialog {
  private dialog: HTMLDialogElement;

  @State() uploads: UploadEntry[] = [];

  @Method()
  async open() {
    this.dialog.showModal();
  }

  @Method()
  async close() {
    this.dialog.close();
  }

  @Method()
  async addUpload(id: string, filename: string) {
    this.uploads = [...this.uploads, {
      id,
      filename,
      pending: true,
      percent: 0,
      complete: false,
      error: null,
    }];
  }

  @Method()
  async startUpload(id: string) {
    this.uploads = this.uploads.map(u =>
      u.id === id ? { ...u, pending: false } : u
    );
  }

  @Method()
  async updateProgress(id: string, percent: number) {
    this.uploads = this.uploads.map(u =>
      u.id === id ? { ...u, percent } : u
    );
  }

  @Method()
  async setError(id: string, error: string) {
    this.uploads = this.uploads.map(u =>
      u.id === id ? { ...u, error } : u
    );
  }

  @Method()
  async completeUpload(id: string) {
    this.uploads = this.uploads.map(u =>
      u.id === id ? { ...u, complete: true } : u
    );
  }

  @Method()
  async removeUpload(id: string) {
    this.uploads = this.uploads.filter(u => u.id !== id);
  }

  render() {
    return (
      <Host>
        <dialog ref={el => this.dialog = el}>
          <div class="direct-upload-wrapper">
            <div class="direct-upload-content">
              <h3>Uploading your media</h3>
              {this.uploads.map(upload => (
                <progress-bar
                  key={upload.id}
                  class={{
                    "direct-upload--pending": upload.pending,
                    "direct-upload--complete": upload.complete,
                    "direct-upload--error": !!upload.error,
                  }}
                  percent={upload.percent}
                  title={upload.error || undefined}
                >
                  {upload.filename}
                </progress-bar>
              ))}
            </div>
          </div>
        </dialog>
      </Host>
    );
  }
}
