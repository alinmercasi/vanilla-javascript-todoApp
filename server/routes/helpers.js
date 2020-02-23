import dbConnection from '../dbConfig.js'
import {
  createTodo,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
} from '../services/todo.js'

// ROUTES
// GET - /api/todos/ -> getAllTodos()
// POST - /api/todos/ -> addTodo()
// GET - /api/todos/:todoId -> getTodo()
// PATCH - /api/todos/:todoId -> updateTodo()
// DELETE - /api/todos/:todoId -> deleteTodo()

const todoRoutes = {
  async getAllTodos(req, res) {
    try {
      await dbConnection()
      const allTodos = await getTodos()
      if (allTodos) {
        return res.status(200).json(allTodos)
      }
    } catch (error) {
      res.send(error)
    }
  },

  async getOneTodo(req, res) {
    try {
      await dbConnection()
      const { id } = req.params
      const todo = await getTodoById(id)
      if (todo) return res.status(200).json(todo)
    } catch (error) {
      res.send(error)
    }
  },

  async deleteOneTodo(req, res) {
    try {
      await dbConnection()
      const { id } = req.params
      const currentTodo = await deleteTodo(id)
      return res.json(currentTodo)
    } catch (error) {
      res.send(error)
    }
  },

  async updateOneTodo(req, res) {
    try {
      await dbConnection()
      const { id } = req.params
      const currentTodo = await updateTodo(id, req.body)
      return res.status(200).json(currentTodo)
    } catch (error) {
      res.send(error)
    }
  },

  async createOneTodo(req, res) {
    try {
      await dbConnection()
      const data = req.body
      const todo = await createTodo(data)
      if (todo) return res.status(200).json(todo)
    } catch (error) {
      res.send(error)
    }
  },
}

export default todoRoutes
