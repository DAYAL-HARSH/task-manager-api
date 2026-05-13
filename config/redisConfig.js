const redis = require('redis')

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

client.on('connect', () => console.log('Redis connected successfully'))
client.on('error', (err) => console.log('Redis error:', err))

client.connect()

module.exports = client