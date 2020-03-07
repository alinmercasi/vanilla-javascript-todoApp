import fetchy from './fetchy.js'

const getTodos = async () => {
  return await fetchy('/api/todos')
}

const createTodo = async todo =>
  await fetchy('/api/todos', {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }),
    body: todo,
  })

const deleteTodo = async id => {
  try {
    return await fetchy(`/api/todos/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.log(error)
  }
}

const updateTodo = async (id, data) => {
  try {
    return await fetchy(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      }),
      body: data,
    })
  } catch (error) {
    console.log(error)
  }
}

export { getTodos, createTodo, deleteTodo, updateTodo }