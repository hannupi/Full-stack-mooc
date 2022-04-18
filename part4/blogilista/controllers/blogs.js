const router = require("express").Router()
const { response } = require("../app")
const Blog = require("../models/blog")

router.get('/', async (req, res) => {
    const blog = await Blog.find({})
    if (blog) {
        res.json(blog)
    }
    else {
        res.status(404).end()
    }

})

router.post('/', async (req, res) => {
    const blog = new Blog(req.body)

    if (!blog.likes) {
        blog.likes = 0
    }

    if (!blog.title || !blog.url) {
        res.status(400).send("Title or URL missing!")
    }
    else {
        const savedBlog = await blog.save()
        res.json(savedBlog)
    }
})

router.delete("/:id", async (req,res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

router.put("/:id", async (req,res) => {
    await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    response.status(200).end()
})

module.exports = router