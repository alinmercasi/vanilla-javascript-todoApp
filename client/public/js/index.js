import { createElement, setProps, render } from './helpers.js'
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
  let { id } = todo
  let { message } = await deleteTodo(id)
  showMessage(message)
  todo.parentNode.removeChild(todo)
}

const patchTodo = async event => {
  let todo = event.target.closest('.task')
  let { id, completed } = todo
  if (todo && event.target.className !== 'delete-button') {
    completed = !completed
    let { message } = await updateTodo(id, { completed })
    showMessage(message)
    setProps(todo, { completed })
    todo.classList.toggle('completed')
  }
}

const button = () => createElement('button', {onclick: deleteNode}, 'Delete')

const todoContent = ({ content }) =>
  createElement('span', { className: 'todo-content' }, content)

const todoItem = todo => {
  let { _id: id, completed, content } = todo
  let [deleteButton, mainContent] = [button(), todoContent({ content })]
  let li = createElement(
    'li',
    { id, completed, className: 'task', onclick: patchTodo },
    mainContent,
    deleteButton,
  )
  if (completed) li.classList.add('completed')
  return li
}


const addTodoItem = async event => {
  event.preventDefault()
  let { todo, message } = await createTodo({ content: form.elements[0].value })
  let todoNode = todoItem(todo)
  showMessage(message)
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
