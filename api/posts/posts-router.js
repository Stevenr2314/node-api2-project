// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const post = await Post.findById(id)
        if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(post)
        }
    }
    catch {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
    
})

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params
    try{
        const post = await Post.findById(id)
        const comments = await Post.findPostComments(id)
        if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(comments)
        }
    }
    catch {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body
    const {title, contents} = changes
    Post.findById(id)
        .then(post => {
            if(!post){
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
            else if(!title || !contents) {
                res.status(400).json({ message: "Please provide title and contents for the post" })
            } else{
                Post.update(id, changes)
                    .then(count => {
                        if(count = 1){
                            Post.findById(id)
                                .then(post => res.status(200).json(post))
                                .catch(err => console.log(err))
                        }
                    })
                    .catch(err => res.status(500).json({ message: "The post information could not be modified" }))
            }
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Post.findById(id)
        .then(post => {
            if(!post){
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            } else {
            Post.remove(id)
                .then(count => {
                    if(count = 1) {
                        res.status(200).json(post)
                    }})
                .catch(err => res.status(500).json({ message: "The post could not be removed" }))
            }
        })
        .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist" }))
})

module.exports = router