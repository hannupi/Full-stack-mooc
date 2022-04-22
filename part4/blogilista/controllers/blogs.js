const router = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

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

router.post('/', async (req, res) => {
    const user = await User.find({})
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes || 0,
        user: user[0]._id
    })

    if (!blog.title || !blog.url) {
        res.status(400).send("Title or URL missing!")
    }
    else {
        const savedBlog = await blog.save()
        user[0].blogs = user[0].blogs.concat(savedBlog._id)
        await user[0].save()


        res.json(savedBlog)
    }
})

router.delete("/:id", async (req,res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).send("Deleted successfully!")
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