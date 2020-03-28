const isArray = value => Array.isArray(value)

const isObject = object =>
  object !== null && typeof object === 'object' && !Array.isArray(object)

// const isFunction = func => {
//   return func && {}.toString.call(func) === '[object Function]'
// }

const setProps = (element, props) => {
  if (!isObject(props)) throw new Error('Props must be an object')
  Object.keys(props).map(prop => (element[prop] = props[prop]))
}

const createElement = (tag, props, ...children) => {
  let element = document.createElement(tag)
  if (props) Object.assign(element, props)
  if (children)
    children.map(child => {
      if (isObject(child)) element.appendChild(child)
      else element.appendChild(document.createTextNode(child))
    })
  return element
}

const render = (element, parent) => parent.appendChild(element)

export { createElement, setProps, render }
