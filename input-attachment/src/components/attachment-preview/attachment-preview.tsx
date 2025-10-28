import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'attachment-preview',
  styleUrl: 'attachment-preview.css',
  shadow: true,
})
export class AttachmentPreview {
  @Prop({ reflect: true }) src: string
  @Prop({ reflect: true }) filetype: string

  render() {
    return (
      <Host class={this.computeClass()}>
        {this.isImage() && <img src={this.src} />}
        {this.isVideo() && <video src={this.src} onClick={toggle} />}
        {this.isOther() && "This file does not offer a preview"}
        <slot></slot>
      </Host>
    );
  }

  private computeClass() {
    if(this.isImage()) return "image"
    if(this.isVideo()) return "video"
    return "other"
  }

  private isImage() {
    return this.filetype == "image"
  }

  private isVideo() {
    return this.filetype == "video"
  }

  private isOther() {
    return !this.isImage() && !this.isVideo()
  }
}

const toggle = function() { this.paused ? this.play() : this.pause(); return false }
