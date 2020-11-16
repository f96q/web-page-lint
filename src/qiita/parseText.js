export function parseText(document) {
  const body = document.querySelector('.it-MdContent')

  Array.from(body.getElementsByTagName('pre')).forEach(tag => tag.innerHTML = '')

  return body
}
