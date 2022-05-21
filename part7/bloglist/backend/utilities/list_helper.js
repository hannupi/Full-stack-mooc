const lodash = require("lodash")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    likes = (blogs.map(blogs => blogs.likes))

    return blogs.length === 0
        ? 0
        : likes.reduce((previous,current) => previous+current)

}

const favoriteBlog = (blogs) => {
    likes = (blogs.map(blogs => blogs.likes))

    return blogs.find(blog => blog.likes === Math.max(...likes))
}

const mostBlogs = (blogs) => {
    const authors = lodash.countBy(blogs, "author")
    var blogAuthor = ""
    var blogCount = 0

    for (let i in authors) {
        if (authors[i] > blogCount) {
            blogCount = authors[i]
            blogAuthor = i
        }
    }

    return {
        author: blogAuthor,
        blogs: blogCount
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}