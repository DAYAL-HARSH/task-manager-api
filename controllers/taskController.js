const Task = require('../models/Task')
const redisClient = require('../config/redisConfig')

const clearUserCache = async (userId) => {
    const keys = await redisClient.keys(`tasks:${userId}:*`)
    if(keys.length > 0){
        await redisClient.del(keys)
        console.log(`Cache cleared for user: ${userId}`)
    }
}


const getTask = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const status = req.query.status

        const filter = { user: req.userId }
        if (status === 'completed') filter.completed = true
        if (status === 'pending') filter.completed = false

        const cacheKey = `tasks:${req.userId}:${page}:${limit}:${status || 'all'}`

        const cached = await redisClient.get(cacheKey)
        if (cached) {
            console.log('Cache hit:', cacheKey)
            return res.status(200).json({
                ...JSON.parse(cached),
                source: 'cache'
            })
        }

        console.log('Cache miss:', cacheKey)

        const [tasks, totalTasks, activeCount, completedCount] = await Promise.all([
            Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Task.countDocuments(filter),
            Task.countDocuments({ user: req.userId, completed: false }),
            Task.countDocuments({ user: req.userId, completed: true })
        ])

        const totalPages = Math.ceil(totalTasks / limit)

        const responseData = {
            message: 'Tasks fetched successfully',
            pagination: {
                totalTasks,
                totalPages,
                currentPage: page,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            stats: {
                active: activeCount,
                completed: completedCount
            },
            tasks
        }

        await redisClient.setEx(cacheKey, 300, JSON.stringify(responseData))

        res.status(200).json({
            ...responseData,
            source: 'database'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
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
        await clearUserCache(req.userId)

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
        await clearUserCache(req.userId)
        
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
        await clearUserCache(req.userId)
        
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