const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log('Database connection failed', error))


app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.json ({
    message : 'Task Manager API is running',
    version : '1.0.0',
    endpoints : {
      auth : '/api/auth/register, /api/auth/login',
      tasks : '/api/tasks'
    }
  })
})