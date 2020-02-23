import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 5,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

const TodoModel = mongoose.model('Todo', TodoSchema)
export default TodoModel
