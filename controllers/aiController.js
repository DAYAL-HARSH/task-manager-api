const Groq = require('groq-sdk')

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const suggestTasks = async (req, res) => {
    try {
        const { goal } = req.body

        if(!goal) {
            return res.status(400).json({
                message: 'Goal is required'
            })
        }

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: `You are a productivity assistant. when given a goal, break it down into 5-7 clear, actionable subtasks.'
                    Respond ONLY with a JSON array of strings. No explanation, no markdown, no extra text.
                    Example: ["Task 1", "Task 2", "Task 3"]`
                }, 
                {
                    role: 'user',
                    content: `Break this goal into subtasks: ${goal}` 
                }
            ],
            temperature: 0.7,
            max_tokens: 500 
        })

        const raw = completion.choices[0].message.content.trim()
        
        const suggestions = JSON.parse(raw)

        res.status(200).json({
            message: 'Tasks suggested successfully',
            goal,
            suggestions
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message 
        })
    }
}

module.exports = { suggestTasks }