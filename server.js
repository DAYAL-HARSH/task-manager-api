const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')
const startReminderService = require('./services/reminderServices')
const redisClient = require('./config/redisConfig')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false
})

app.use(cors({
  origin: [
    'https://localhost:3000',
    'https://taskmanager-fronte.netlify.app'
  ],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(globalLimiter)

app.use('/api/auth', authLimiter, require('./routes/authRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))
app.use('/api/ai', require('./routes/aiRoutes'))

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/register, /api/auth/login',
      tasks: '/api/tasks',
      ai: '/api/ai/suggest'
    }
  })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully')
    startReminderService()
  })
  .catch((error) => console.log('Database connection failed', error))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})