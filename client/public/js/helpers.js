export const createElement = (tag, className) => {
    let element = document.createElement(tag)
    if (className) element.classList.add(className)
    // if (props) {
    //   [...props].map(prop => element[prop] = prop.value)
    // }
    return element
}