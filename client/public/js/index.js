import { createElement, setProps } from './helpers.js'
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
  let { id } = JSON.parse(todo.dataset.props)
  let { message } = await deleteTodo(id)
  showMessage(message)
  todo.parentNode.removeChild(todo)
}

const patchTodo = async event => {
  let todo = event.target.closest('.task')
  let { id, completed } = JSON.parse(todo.dataset.props)
  if (todo && event.target.className !== 'delete-button') {
    completed = !completed
    let { message } = await updateTodo(id, { completed })
    showMessage(message)
    setProps(todo, { id, completed })
    todo.classList.toggle('completed')
  }
}

const createTodoItem = todo => {
  let { _id: id, completed, content } = todo
  let li = createElement('li', 'task', { id, completed })
  let deleteButton = createElement('button', 'delete-button')
  let todoContent = createElement('span', 'todo-content')

  if (completed) li.classList.add('completed')
  todoContent.textContent = content
  deleteButton.textContent = 'Remove'

  li.append(todoContent, deleteButton)

  deleteButton.addEventListener('click', deleteNode)
  li.addEventListener('click', patchTodo)

  return li
}

const render = element => todoList.appendChild(element)

const addTodoItem = async event => {
  event.preventDefault()
  let { todo, message } = await createTodo({ content: form.elements[0].value })
  showMessage(message)
  let todoNode = createTodoItem(todo)
  render(todoNode)
}

const init = async () => {
  let todos = await getTodos()
  let todoItems = todos.map(createTodoItem)
  todoItems.map(render)
  form.addEventListener('submit', addTodoItem)
}

document.addEventListener('DOMContentLoaded', init)
