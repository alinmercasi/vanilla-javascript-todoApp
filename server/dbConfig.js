import mongoose from 'mongoose'

const config = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

mongoose.Promise = global.Promise

const connectToDatabase = async () => {
  let isConnected
  if (isConnected) {
    console.log('Connected to database')
    return Promise.resolve()
  }

  const database = await mongoose.connect('mongodb://localhost/api', config)
  isConnected = database.connections[0].readyState
  // return isConnected;
}

export default connectToDatabase
