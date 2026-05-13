const cron = require('node-cron')
const Task = require('../models/Task')
const User = require('../models/User')
const transporter = require('../config/emailConfig')

const startReminderService = () => {

    cron.schedule('0 8 * * *', async () => {
        console.log('Running daily task reminder...')

        try{
            const users = await User.find({})

            for(const user of users) {
                const pendingTasks = await Task.find({
                    user: user._id,
                    completed: false 
                })

                if(pendingTasks.length === 0) continue

                const taskList = pendingTasks
                    .map((task, index) => `${index + 1}. ${task.title}`)
                    .join('\n')
                
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: `Taskly - you have ${pendingTasks.length} pending task(s)`,
                    text: `Hi ${user.name}, \n\nHere are your pending tasks for today:\n\n${taskList}\n\nStay productive!\nTaskly`
                }

                await transporter.sendMail(mailOptions)
                console.log(`Reminder sent to ${user.email}`)
            }
        } catch (error) {
            console.error('Reminder service error:', error.message)
        }
    })
    console.log('Reminder service started')
}

module.exports = startReminderService