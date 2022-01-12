// implement your server here
// require your posts router and connect it here
const express = require('express')
const postsRouter = require('./posts/posts-router.js')

const server = express()
server.use(express.json());

server.use('/api/posts', postsRouter)

server.get('/api/posts', (req, res) => {

})


server.post('/api/posts', (req, res) => {
    
})



module.exports = server