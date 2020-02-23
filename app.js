import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import router from './server/routes/todos.js'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/client`))
app.use(express.static('client/public'))

app.get('/', (req, res) => res.sendFile('index.html'))
app.use('/api/todos', router)

app.listen(PORT, () => console.log(`ToDo App runing on port ${PORT}`))
