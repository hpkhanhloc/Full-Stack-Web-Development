const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (a, b) => {
        return Math.max(a,b)
    }
    const maxlike = blogs.find(blog => blog.likes === blogs.map(blog => blog.likes).reduce(reducer))
    return {"title": maxlike.title, "author": maxlike.author, "likes": maxlike.likes }
}

const mostBlog = (blogs) => {
    const _ = require('lodash')
    const authors = _.map(_.countBy(blogs, 'author'), (value, key) => ({"author": key, "blogs":value})) 

    return _.maxBy(authors, "blogs")
}

const mostLike = (blogs) => {
    const _ = require('lodash')
    const authors = _.groupBy(blogs, 'author')
    const auth = _.map(authors, (value, key) =>({"author": key, "likes": _.reduce(value, function(sum, item){return sum + item.likes},0)}))
    return _.maxBy(auth, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLike
}