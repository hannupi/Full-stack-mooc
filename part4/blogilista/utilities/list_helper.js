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

/* 4.6 ja 4.7 TODO
const mostBlogs = (blogs) => {
    blogCount = {}
    authors = blogs.map(blog => blog.author)
    for (let author in authors) {
        if (blogCount[author]) {
            blogCount[author] += 1;
        }
        else {
            blogCount[author] = 1
        }
    }

    return blogCount.author
}

const mostLikes = (blogs) => {
    return 0
}
*/
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,

}