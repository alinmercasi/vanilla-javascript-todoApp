import todoRoutes from './helpers.js'
import express from 'express'

const router = express.Router()
const {
  getAllTodos,
  getOneTodo,
  deleteOneTodo,
  updateOneTodo,
  createOneTodo,
} = todoRoutes

router
  .route('/')
  .get(getAllTodos)
  .post(createOneTodo)

router
  .route('/:id')
  .get(getOneTodo)
  .patch(updateOneTodo)
  .delete(deleteOneTodo)

export default router
