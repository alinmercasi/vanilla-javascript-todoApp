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

const createElement = (tag, className, props) => {
  let element = document.createElement(tag)
  if (className) element.classList.add(className)
  if (props) setProps(element, {...props})
  return element
}

// const createElement = (tag, props, state) => {
//     let element = document.createElement(tag)
//     if (props) setProps(element, props)
//     return element
//   }

// const createTextNode = text => ({
//   type: 'TEXT_NODE',
//   props: {
//     nodeValue: text,
//   },
//   children: [],
// })

// const component = (type, props, state, ...children) => {
//   return {
//     type,
//     ...props,
//     ...state,
//     children: children.map(child =>
//       isObject(child) ? child : createTextNode(child),
//     ),
//   }
// }

// const renderDom = (element, container) => {
//   let domNode =
//     element.type === 'TEXT_NODE'
//       ? document.createTextNode('')
//       : document.createElement(element.type)

//   Object.keys(element.props).forEach(
//     prop => (domNode[prop] = element.props[name]),
//   )

//   element.children.forEach(child => renderDom(child, domNode))
//   container.appendChild(domNode)
// }

export { createElement, setProps }
