export function addClass (el, className) {
  el.classList.add(className)
}

export function getData (el, name, val) {
  let prefix = 'data-'
  let prefixName = prefix + name
  if (val) {
    return el.setAttribute(prefixName, val)
  } else {
    return el.getAttribute(prefixName)
  }
}