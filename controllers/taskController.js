const Task = require('../models/Task')

const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({ user : req.userId })

        res.status(200).json ({
            message : 'Tasks fetched successfully',
            count : tasks.length,
            tasks
        })

    } catch (error) {
        res.status(500).json ({
            message : 'Server error',
            error : error.message
        })
    }
}

const createTask = async (req, res) => {
    try {
        const {title , description } =req.body 

        if (!title) {
            return res.status(400).json ({
                message : 'Title is required'
            })
        }

        const task = await Task.create ({
            title, 
            description, 
            user : req.userId 
        })

        res.status(201).json ({
            message : 'Task created successfully',
            task
        })

    } catch (error) {
        res.status(500).json ({
            message : 'Server error',
            error : error.message
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body

        const task = await Task.findOne({ 
            _id : req.params.id,
            user : req.userId
        })

        if (!task) {
            return res.status(404).json ({
                message : 'Task not found'
            })
        }

        if (title !== undefined) task.title = title
        if (description !== undefined) task.description = description
        if (completed !== undefined) task.completed = completed 

        await task.save()
        
        res.status(200).json ({
            message : 'Task updated successfully',
            task 
        })

    } catch (error) {
        res.status(500).json ({
            message : 'Server error',
            error : error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id : req.params.id,
            user : req.userId    
        })

        if (!task) {
            return res.status(404).json ({
                message : 'Task not found'
            })
        }

        await task.deleteOne()
        
        res.status(200).json ({
            message : 'Task deleted successfully'   
        })

    } catch (error) {
        res.status(500).json ({
            message : 'Server error',
            error : error.message
        })
    }
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask  
}