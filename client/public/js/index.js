import { createElement, setProps, getProps, render } from './helpers.js'
import { getTodos, deleteTodo, createTodo, updateTodo } from './services.js'

const todoList = document.querySelector('.todo-list')
const form = document.querySelector('form')
const messageDiv = document.getElementById('message')

const showMessage = message => {
  messageDiv.classList.remove('hidden')
  messageDiv.textContent = message
  setTimeout(() => {
    messageDiv.classList.add('hidden')
  }, 5000)
}

const deleteNode = async event => {
  event.preventDefault()
  let todo = event.target.parentNode
  let { id } = getProps(todo)
  let { message } = await deleteTodo(id)
  showMessage(message)
  todo.parentNode.removeChild(todo)
}

const patchTodo = async event => {
  let todo = event.target.closest('.task')
  let { id, completed } = getProps(todo)
  if (todo && event.target.className !== 'delete-button') {
    completed = !completed
    let { message } = await updateTodo(id, { completed })
    showMessage(message)
    setProps(todo, { id, completed })
    todo.classList.toggle('completed')
  }
}

const button = () => {
  let buttonElement = createElement('button', 'delete-button')
  buttonElement.textContent = 'Delete'
  buttonElement.addEventListener('click', deleteNode)
  return buttonElement
}

const todoContent = ({ content }) => {
  let contentElement = createElement('span', 'todo-content', { content })
  contentElement.textContent = content
  return contentElement
}

const todoItem = todo => {
  let { _id: id, completed, content } = todo
  let [deleteButton, mainContent] = [button(), todoContent({ content })]
  let li = createElement('li', 'task', { id, completed }, [
    mainContent,
    deleteButton,
  ])

  if (completed) li.classList.add('completed')
  li.addEventListener('click', patchTodo)

  return li
}

const addTodoItem = async event => {
  event.preventDefault()
  let { todo, message } = await createTodo({ content: form.elements[0].value })
  showMessage(message)
  let todoNode = todoItem(todo)
  render(todoNode, todoList)
  form.reset()
}

const init = async () => {
  let todos = await getTodos()
  let todoItems = todos.map(todoItem)
  todoItems.map(todoItem => render(todoItem, todoList))
  form.addEventListener('submit', addTodoItem)
}

document.addEventListener('DOMContentLoaded', init)
