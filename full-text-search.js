const elasticsearch = require("elasticsearch")
const {getChapters,getBooks , getComments , getBookById , getChapter , getComment} = require("./sqlwork")
const {initChapter} = require('./entity/chapter')
const {initBook} = require('./entity/book')
const {initComment} = require('./entity/comment')
const esClient = elasticsearch.Client({
    host: "http://127.0.0.1:9200",
})

let bookArray = []
let bookIsIndexed = false
let chapterIsIndexed = false
let commentIsIndexed = false

const indexingChapters = (Sequelize , sequelize) => {
    return new Promise((resolve, reject)=> {
        const Chapter  = initChapter(Sequelize , sequelize)
        if(chapterIsIndexed) {
            chapterIsIndexed = false
            esClient.indices.delete({
                index: "chapters"
            }).then(() => {
                getChapters(Chapter).then(chapters => {
                    chapters.forEach(chapter => {
                        esClient.index({
                            index: "chapters",
                            body:
                                {
                                    'chapter_id': chapter.chapter_id,
                                    'chapter_name':chapter.chapter_name,
                                    'text':chapter.text
                                }
                        })
                            .then(res => {
                                resolve(res)
                            })
                    })
                })
            })
        }
        else {
            chapterIsIndexed = true
            getChapters(Chapter).then(chapters => {
                chapters.forEach(chapter => {
                    esClient.index({
                        index: "chapters",
                        body:
                            {
                                'chapter_id': chapter.chapter_id,
                                'chapter_name':chapter.chapter_name,
                                'text':chapter.text
                            }
                    })
                        .then(res => {
                            resolve(res)
                        })
                })
            })
        }
    })
}

const indexingBooks = (Sequelize , sequelize) => {
    return new Promise((resolve, reject)=> {
        const Book = initBook(Sequelize, sequelize)
        if(bookIsIndexed) {
            bookIsIndexed = false
            esClient.indices.delete({
                index: "books",
            }).then(()=> {
                    getBooks(Book).then(books => {
                        books.forEach(book => {
                            esClient.index({
                                index: "books",
                                body:
                                    {
                                        'book_id': book.book_id,
                                        'book_name': book.book_name,
                                        'book_descr': book.book_descr ,
                                        'book_genre': book.book_genre ,
                                        'quant_of_ratings': book.quant_of_ratings ,
                                        'cur_ratings': book.cur_ratings
                                    }
                            })
                                .then(res => {
                                    resolve(res)
                                })
                        })
                    })
                }
            )
        }
        else {
            bookIsIndexed = true
            getBooks(Book).then(books => {
                books.forEach(book => {
                    esClient.index({
                        index: "books",
                        body:
                            {
                                'book_id': book.book_id,
                                'book_name': book.book_name,
                                'book_descr': book.book_descr ,
                                'book_genre': book.book_genre ,
                                'quant_of_ratings': book.quant_of_ratings ,
                                'cur_ratings': book.cur_ratings
                            }
                    })
                        .then(res => {
                            resolve(res)
                        })
                })
            })
        }
    })
}

const indexingComments = (Sequelize , sequelize) => {
    return new Promise((resolve, reject)=> {
        const Comment = initComment(Sequelize, sequelize)
        if(commentIsIndexed) {
            commentIsIndexed = false
            esClient.indices.delete({
                index: "comments",
            }).then(()=> {
                    getComments(Comment).then(comments => {
                        comments.forEach(comment => {
                            esClient.index({
                                index: "comments",
                                body:
                                    {
                                        'comment_text': comment.comment_text
                                    }
                            })
                                .then(res => {
                                    resolve(res)
                                })
                        })
                    })
                }
            )
        }
        else {
            commentIsIndexed = true
            getComments(Comment).then(comments => {
                comments.forEach(comment => {
                    esClient.index({
                        index: "comments",
                        body:
                            {
                                'comment_text': comment.comment_text
                            }
                    })
                        .then(res => {
                            resolve(res)
                        })
                })
            })
        }

    })

}

exports.indexing = (Sequelize, sequelize) => {
    indexingChapters(Sequelize, sequelize).then(()=> {
        indexingBooks(Sequelize, sequelize).then(()=> {
            indexingComments(Sequelize, sequelize).then(()=> {
            })
        })
    })
}

exports.searchFromChapters = (filter , sequelize) => {
    return new Promise((resolve, reject)=> {
        esClient.search({
            index: "chapters",
            body: {
                query: {
                    match: {"text": filter.trim()}
                }
            }
        })
            .then(result => {
                result.hits.hits.forEach(res => {
                    getChapter(res._source.chapter_id , sequelize).then(chapter => {
                        chapter.getBook().then(book => {
                            bookArray.push(book)
                        })
                    })
                })
            })
    })
}

exports.searchFromBooks = (filter , sequelize) => {
    return new Promise((resolve, reject)=> {
        esClient.search({
            index: "books",
            body: {
                query: {
                    match: {"book_descr": filter.trim() },
                    match: {"book_name" : filter.trim()}
                }
            }
        })
            .then(result => {
                result.hits.hits.forEach(res => {
                    getBookById(res._source.book_id , sequelize).then(book => {
                        console.log(book)
                        bookArray.push(book)
                    })
                })
            })
    })
}

exports.searchFromComment = (filter , sequelize) => {
    return new Promise((resolve, reject)=> {
        esClient.search({
            index: "comments",
            body: {
                query: {
                    match: {"comment_text": filter.trim()}
                }
            }
        })
            .then(result => {
                result.hits.hits.forEach(res => {
                    getComment(res._source.chapter_id , sequelize).then(comment => {
                        comment.getBook().then(book => {
                            bookArray.push(book)
                        })
                    })
                })
            })
    })
}
