const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require("../models/blog")

const startBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
]

// Alusta testattava tietokanta
beforeEach(async () => {
    await Blog.deleteMany()
    let blogObject = new Blog(startBlogs[0])
    await blogObject.save()
    blogObject = new Blog(startBlogs[1])
    await blogObject.save()
    blogObject = new Blog(startBlogs[2])
    await blogObject.save()
})

describe("API tests for blogs", () => {
    test('right amount blogs', async () => {
        const res = await api.get("/api/blogs")
        expect(res.body).toHaveLength(startBlogs.length)
    })

    test("blogs are in JSON format", async () => {
        await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("id instead of _id", async () => {
        // 4.9 Oletan että tässä riittää yhden blogin ID:n tarkastus, vaihtoehtoisena voisi iteroida kaikkien läpi.
        const res = await api.get("/api/blogs")
        expect(res.body[0].id).toBeDefined()
    })

    test("Try sending one POST request through", async () => {
        const newBlog = {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }

        await api.post("/api/blogs")
            .send(newBlog)

        const res = await api.get("/api/blogs")
        expect(res.body).toHaveLength(startBlogs.length + 1)
    })

    test("If no given likes value, set 0", async () => {
        const noLikeBlog = {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            __v: 0
        }

        await api.post("/api/blogs")
            .send(noLikeBlog)

        const res = await api.get("/api/blogs")

        res.body.map(blog => {
            if (blog.title === noLikeBlog) {
                expect(blog.likes).toEqual(0)
            }
        })
    })

    test("No URL/title", async () => {
        const noUrlBlog = {
            _id: "5a422bc61b54a676234d17fc",
            author: "Robert C. Martin",
            __v: 0
        }

        await api.post("/api/blogs")
            .send(noUrlBlog)
            .expect(400)

    })

    test("try to delete a post", async () => {
        await api.delete("/api/blogs/5a422aa71b54a676234d17f8")
            .expect(204)

        const res = await api.get("/api/blogs")
        expect(res.body).toHaveLength(startBlogs.length - 1)

    })

})

afterAll(() => {
    mongoose.connection.close()
})