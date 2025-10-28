function html(html) {
  const el = document.createElement("div")
  el.innerHTML = html
  return el.children[0]
}

function arrayRemove(arr, e) {
  const index = arr.findIndex(x => x === e)
  if(index !== -1) {
    arr.splice(index, 1)
  }
}

export { html, arrayRemove }
