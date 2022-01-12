// implement your server here
// require your posts router and connect it here
const express = require('express')
const Post = require('./posts/posts-model')
const postsRouter = require('./posts/posts-router.js')

const server = express()
server.use(express.json());

server.use('/api/posts', postsRouter)

server.get('/api/posts', (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ message: "The posts information could not be retrieved" }))
})


server.post('/api/posts', (req, res) => {
    const post = req.body
    const {title, contents} = post
    if(!title || !contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }
    else {
        Post.insert(post)
            .then(resp => {
                Post.findById(resp.id)
                    .then(post => res.status(201).json(post))
                    .catch(err => res.status(500).json({ message: "The post with the specified ID does not exist" }))
            })
            .catch(resp => res.status(500).json({ message: "There was an error while saving the post to the database" }))
    }
    
})



module.exports = server