export function parseText(document) {
  const body = document.querySelector('.o-noteContentText__body')

  Array.from(body.getElementsByTagName('p')).forEach(tag => tag.innerHTML = tag.innerHTML + "\n")
  Array.from(body.getElementsByTagName('pre')).forEach(tag => tag.innerHTML = '')

  return body
}
