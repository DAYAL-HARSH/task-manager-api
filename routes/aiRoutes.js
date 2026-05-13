const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { suggestTasks } = require('../controllers/aiController')

router.post('/suggest', auth, suggestTasks)

module.exports = router