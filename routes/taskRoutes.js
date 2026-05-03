const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
    getTask, 
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController')

router.get('/', auth, getTask)
router.post('/', auth, createTask)
router.put('/:id', auth, updateTask)
router.delete('/:id', auth, deleteTask)

module.exports = router
   