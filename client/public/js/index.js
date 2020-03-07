import { createElement } from './helpers.js'
import { getTodos, deleteTodo, createTodo, updateTodo } from './services.js'

const todoList = document.querySelector('.todo-list')
const form = document.querySelector('form')

const deleteNode = async event => {
  event.preventDefault()
  let todo = event.target.parentNode
  let data = JSON.parse(todo.dataset.todo)
  let { id } = data
  await deleteTodo(id)
  todo.parentNode.removeChild(todo)
}

const patchTodo = async event => {
  let todo = event.target.closest('.task')
  let { id, completed } = JSON.parse(todo.dataset.todo)
  if (todo && event.target.className !== 'delete-button') {
    let { updated, message } = await updateTodo(id, {
      completed: !completed,
    })
    console.log(message)
    todo.dataset.todo = JSON.stringify({
      id: updated._id,
      completed: updated.completed,
    })
    todo.classList.toggle('completed')
  }
}

const createTodoItem = todo => {
  let li = createElement('li', 'task')
  let deleteButton = createElement('button', 'delete-button')
  let todoContent = createElement('span', 'todo-content')
  let { _id: id, completed } = todo

  let data = JSON.stringify({ id, completed })

  if (todo.completed) li.classList.add('completed')

  todoContent.textContent = todo.content
  deleteButton.textContent = 'Remove'

  li.dataset.todo = data
  li.append(todoContent, deleteButton)

  deleteButton.addEventListener('click', deleteNode)
  li.addEventListener('click', patchTodo)

  return li
}

const render = element => todoList.appendChild(element)

const addTodoItem = async event => {
  event.preventDefault()
  let { data: todo } = await createTodo({ content: form.elements[0].value })
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
