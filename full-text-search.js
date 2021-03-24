const elasticsearch = require("elasticsearch")
const {getChapters,getBooks , getComments , getBookById , getChapter , getComment , getChaptersList} = require("./sqlwork")
const {initChapter} = require('./entity/chapter')
const {initBook} = require('./entity/book')
const {initComment} = require('./entity/comment')
const algoliasearch = require("algoliasearch");
const client = algoliasearch("H017D4FJ1A", "29b539cc291a62b792c846e5b6f6b029");
const bookIndex = client.initIndex("books");

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

const initBookIndex = () => {
    return bookIndex
}

exports.indexing = (Sequelize , sequelize) => {
    return new Promise((resolve, reject)=> {
        const ind = initBookIndex()
        const Book = initBook(Sequelize, sequelize)
        const Chapter = initChapter(Sequelize, sequelize)
        const Comment = initComment(Sequelize, sequelize)
        Book.hasMany(Chapter)
        Book.hasMany(Comment)
        let booksArray = []
            getBooks(Book).then(books => {
                books.forEach(book => {
                    let curBook = {}
                    getChaptersList(Book ,book.book_name).then(chapters => {
                        getComments(Book , book.book_name).then(comments => {
                            curBook.chapters = chapters
                            curBook.comments = comments
                            curBook.book_id = book.book_id
                            curBook.book_name = book.book_name
                            curBook.book_desc = book.book_descr
                            curBook.book_genre =  book.book_genre
                            curBook.cur_rating =  book.cur_rating
                            curBook.objectID = book.book_id
                        }).then(result => {
                            ind.
                                saveObject(curBook ,{ autoGenerateObjectIDIfNotExist: true })
                                .then(({ objectIDs }) => {
                                    console.log(objectIDs);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                            })
                    })
                })
            })
        }
    )
}

exports.search = (filter , sequelize) => {
    return new Promise((resolve, reject)=> {
        const ind = initBookIndex()
        ind
            .search(filter)
            .then(({ hits }) => {
                resolve(hits)
            })
            .catch(err => {
                console.log(err);
            });
    })
}

exports.addIndex = (Sequelize , sequelize) => {
    return new Promise((resolve, reject)=> {
            const ind = initBookIndex()
            const Book = initBook(Sequelize, sequelize)
            const Chapter = initChapter(Sequelize, sequelize)
            const Comment = initComment(Sequelize, sequelize)
            Book.hasMany(Chapter)
            Book.hasMany(Comment)
            let booksArray = []
            getBooks(Book).then(books => {
                books.forEach(book => {
                    let curBook = {}
                    getChaptersList(Book ,book.book_name).then(chapters => {
                        getComments(Book , book.book_name).then(comments => {
                            curBook.chapters = chapters
                            curBook.comments = comments
                            curBook.book_id = book.book_id
                            curBook.book_name = book.book_name
                            curBook.book_desc = book.book_descr
                            curBook.book_genre =  book.book_genre
                            curBook.cur_rating =  book.cur_rating
                            curBook.objectID = book.book_id
                            console.log(curBook)
                        }).then(result => {
                            ind.
                            partialUpdateObject(curBook,
                            {
                                createIfNotExists: true,
                            })
                                .then(({ objectIDs }) => {
                                    console.log(objectIDs);
                                })
                                .catch(err => {
                                });
                        })
                    })
                })
            })
        }
    )
}
