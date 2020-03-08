const isObject = object =>
  object !== null && typeof object === 'object' && !Array.isArray(object)

// const isFunction = func => {
//   return func && {}.toString.call(func) === '[object Function]'
// }

const setProps = (element, props) => {
    if (!isObject(props)) throw new Error('Props must be an object')
    // Object.keys(props).forEach(prop => {

    // })
    element.dataset.props = JSON.stringify({ ...props })
    return { ...props }
  }

const getProps = element => JSON.parse(element.dataset.props)

const createElement = (tag, className, props, children) => {
  let element = document.createElement(tag)
  if (className) element.classList.add(className)
  if (props) setProps(element, {...props})
  if (children) children.forEach(child => element.appendChild(child))
  return element
}

const render = (element, parent) => parent.appendChild(element)

export { createElement, setProps, getProps, render }
