const router = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const blog = require("../models/blog")

router.get('/', async (req, res) => {
    const blog = await Blog.find({})
        .populate("user", {username:1,name:1,id:1})
    if (blog) {
        res.json(blog)
    }
    else {
        res.status(404).end()
    }

})

router.post('/', async (req, res, next) => {

    const user = req.user

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes || 0,
        user: user._id
    })

    if (!blog.title || !blog.url) {
        res.status(400).send("Title or URL missing!")
    }
    else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()


        res.json(savedBlog)
    }
})

router.delete("/:id", async (req,res) => {
    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() === req.user.id ) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).send("Deleted successfully!")
    }
    else {
        res.status(400).send("Failed!")
    }

})

router.put("/:id", async (req,res) => {

    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes || 0,
    }
    await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.status(204).send("Changed the fields successfully!")
})

module.exports = router