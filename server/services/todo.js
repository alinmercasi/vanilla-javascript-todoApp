import Todo from '../models/todo.js'

const createTodo = async todo => {
  let result = await Todo.create(todo)
  if (!result) throw new Error('Error creating new todo')
  return {
    data: todo,
    message: 'Todo successfully created!',
  }
}

const getTodos = async () => {
  const todos = await Todo.find()
  if (!todos) throw new Error('Error fetching todos from database')
  return todos
}

const getTodoById = async id => {
  const todo = await Todo.findById(id)
  if (!todo) throw new Error(`Sorry, we can't find the todo with id: ${id}`)
  return todo
}

const deleteTodo = async id => {
  const todo = await getTodoById(id)
  await Todo.findByIdAndDelete(todo)
  return {
    deleted: todo,
    message: 'Todo successfully deleted!',
  }
}

const updateTodo = async (id, data) => {
  const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, data, {
    new: true,
  })
  if (!updatedTodo) throw new Error('Error updating todo!')
  return {
    updated: updatedTodo,
    message: 'Todo successfully updated!',
  }
}

export { createTodo, getTodoById, getTodos, deleteTodo, updateTodo }
