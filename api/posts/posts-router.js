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
        const comments = await Post.findPostComments(id)
        if(!comments) {
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
    const {title, contents} = req.body
    try{
        const post = await Post.findById(id)
        const changes = {title: title, contents: contents}
        if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else if (!title || !contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            Post.update(id, changes)
            res.status(200).json(changes)
        }
    }
    catch {
        res.status(500).json({ message: "The post information could not be modified" })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const post = await Post.findById(id)
        if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            Post.remove(id)
            res.status(200).json(post)
        }
    }
    catch {
        res.status(500).json({ message: "The post could not be removed" })
    }
})

module.exports = router