const Sequelize = require('sequelize')
const {initBook} = require("./entity/book");
const {initChapter} = require("./entity/chapter");
const {initComment} = require("./entity/comment");
const {initUser} = require("./entity/user");
const {writeBookInst , setChapter , getChaptersList , setConnection ,
    getComments , loadWorks , loadChapter , addUser , validatePassword , checkUser , getUserBooks , addComment,
    loadBook,getChapters , getTags , addTags , addTagsToBook , getBookTags , setRating , getRating , deleteFanfic , setRatingToBook,
    addLike , getLikes,getUsers , deleteUser, blockUser ,getBookProps , editBookInst, editChapterInst} = require ("./sqlwork")
const safety = require('./safety')
const {getTopics} = require("./sqlwork");
const {initTopic} = require("./entity/topic");
const fullText = require("./full-text-search")
const {writeChapterInst} = require("./sqlwork");
const sequelize = setConnection()
const express = require('express')
const router = express.Router()

router.get('/reg' , (req , res) => {
    addUser(req.header('name') , req.header('password') , req.header('email') , sequelize).then(result => {console.log(result)})
})

router.get('/auth' , (req , res) => {
    checkUser(req.header('name') , sequelize).then((user) => {
        if(user) {
            safety.validatePassword(req.header('password') , user.password).then(async (a) => {
                if(a) {
                    if(user.status === "unblocked") {
                        let hashedPassword =  await safety.hashPassword(req.header('password'))
                        let dataForJwt = {name :req.header('name') , password: hashedPassword}
                        let jwtRes = safety.generateToken(dataForJwt)
                        console.log(jwtRes)
                        res.send(jwtRes)
                    }
                    else {
                        res.send("blocked")
                    }
                }
                else {
                    res.send("invalid")
                }
            })
        }
    })
})

router.post('/vkAuth' , (req , res) => {
    addUser(req.body.name , "vk" , "vk" , sequelize).then(result => {
        checkUser(req.body.name , sequelize).then(async (user) => {
            if(user) {
                if(user.status === "unblocked") {
                    let hashedPassword =  await safety.hashPassword("vk")
                    let dataForJwt = {name : req.body.name , password: hashedPassword}
                    let jwtRes = safety.generateToken(dataForJwt)
                    console.log(jwtRes)
                    res.send(jwtRes)
                } else {
                    res.send("blocked")
                }
            }
            else {
                res.send("invalid")
            }
        })
    })
})

router.post('/facebookVkAuth' , (req , res) => {
    checkUser(req.body.name , sequelize).then(async (user) => {
        if(!user) {
            addUser(req.body.name , req.body.password , req.body.email , sequelize).then( async (result) => {
                console.log(result)
                let hashedPassword =  await safety.hashPassword(req.body.password)
                let dataForJwt = {name : req.body.name , password: hashedPassword}
                let jwtRes = safety.generateToken(dataForJwt)
                res.send(jwtRes)
            })
        }
        else {
            if(user.status === "unblocked") {
                let hashedPassword =  await safety.hashPassword(req.body.password)
                let dataForJwt = {name : req.body.name , password: hashedPassword}
                let jwtRes = safety.generateToken(dataForJwt)
                res.send(jwtRes)
            } else {
                res.send("blocked")
            }
        }
    })
})

router.get('/loadUserWorks' , (req , res) => {
    if(req.header('Auth')) {
        if(safety.decodeToken(req.header('Auth')).data.name === "admin") {
            checkUser(req.header('AdminModeUser') , sequelize).then(
                user => {
                    getUserBooks(user).then(books => {
                        res.send(books)
                    })
                })
        }
        else {
            checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(
                user => {
                    getUserBooks(user).then(books => {
                        res.send(books)
                    })
                })
        }
    }
    else {
        res.send("Not authorized")
    }
})

router.get('/search' , (req , res) => {
    const Chapter  = initChapter(Sequelize , sequelize)
    fullText.searchFromBooks(req.header('searchText') , sequelize)
        .then(result=> {console.log(result)
            res.send(result)})
})

router.post('/setRating' , (req , res) => {
    if(req.header('Auth')) {
        checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(
            user => {
                if(user) {
                    setRating(sequelize , user.name , req.header('book_name') , req.body.user_rating).then(result=> {
                        res.send(result)
                    })
                }
            }
        )
    }
})

router.get('/getRating' , (req , res) => {
    getRating(sequelize , req.header('book_name')).then(ratings => {
        if(ratings) {
            const rating = ratings.reduce((sum , cur) => {
                return sum + cur.rating
            } , 0)
            const finalRating = rating/ratings.length
            setRatingToBook(sequelize , finalRating , req.header('book_name'))
            res.send({rating: finalRating})
        }
    })
})

router.get('/loadTopics' , (req , res) => {
    if(req.header('Auth')) {
        getTopics(sequelize).then(result => {
            res.send(result)
        })
    }
})

router.get('/loadTags' , (req , res) => {
    if(req.header('Auth')) {
        getTags(sequelize).then(result => {
            res.send(result)
        })
    }
})

router.post('/addComment' , (req , res) => {
    addComment(req.body.name , req.body.text , sequelize , req.body.book).then(result=>res.send(result))
})

router.get('/loadRecentWorks' , (req , res) => {
    const Book = initBook(Sequelize , sequelize)
    const Comment = initComment(Sequelize , sequelize)
    Book.hasMany(Comment)
    loadWorks(Book).then(result => {
        res.send(result)
    })
})
router.get('/loadChapters' , (req , res) => {
    const Book = initBook(Sequelize , sequelize)
    const Chapter = initChapter(Sequelize , sequelize)
    Book.hasMany(Chapter)
    getChaptersList(Book , req.header('bookName')).then((result) => {
        res.send(result)
    })
})

router.get('/loadComments' , (req , res) => {
    const Book = initBook(Sequelize , sequelize)
    const Comment = initComment(Sequelize , sequelize)
    Book.hasMany(Comment)
    if(req.header('Auth') !== "") {
        checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(
            getComments(Book , req.header('bookName')).then((result) => {
                res.send(result)
            })
        )
    }
    else {
        res.send("Not authorized")
    }
})

router.get('/loadWorks' , (req , res) => {
    const Book = initBook(Sequelize , sequelize)
    const Comment = initComment(Sequelize , sequelize)
    Book.hasMany(Comment)
    loadWorks(Book).then(result => {
        res.send(result)
    })
})

router.get('/loadChapter' , (req ,res) => {
    const Book = initBook(Sequelize, sequelize)
    const Chapter = initChapter(Sequelize, sequelize)
    Book.hasMany(Chapter)
    loadChapter(Book , req.header('chapterName') , req.header('bookName')).then(result => {
        res.send(result)
    })
})

router.post('/addBook' , (req ,res) => {
    if(req.header('Auth')) {
        checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(user=> {
            if(user) {
                console.log(req.body.user)
                writeBookInst(req.header('name') , req.header('descr') , req.body.user , req.header('topic'),sequelize).then(result => {
                    console.log(req.header('name'))
                    req.body.tags.forEach(tag => {
                        addTags(sequelize , tag , result.book_id).then(()=> {
                        })
                    })
                    res.send(result)
                })
            }
            else {
                res.send("no user")
            }
        })
    }
    else {
        res.send("Not authorized")
    }
})

router.post('/editBook' , (req ,res) => {
    if(req.header('Auth')) {
        checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(user=> {
            if(user) {
                editBookInst(req.body.name , req.body.descr , req.body.prevName , sequelize).then(book => {
                    req.body.tags.forEach(tag => {
                        addTags(sequelize , tag , book.book_id).then(()=> {
                        })
                    })
                    res.send("Added")
                })
            }
            else {
                res.send("no user")
            }
        })
    }
    else {
        res.send("Not authorized")
    }
})

router.post('/editChapter' , (req ,res) => {
    if(req.header('Auth')) {
        checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(user=> {
            if(user) {
                editChapterInst(req.body.name , req.body.text , req.body.prevName,req.body.book_name ,sequelize ).then(chapter => {
                    res.send("Added")
                })
            }
            else {
                res.send("no user")
            }
        })
    }
    else {
        res.send("Not authorized")
    }
})


router.get('/getUsers' , (req ,res) => {
    if(req.header('Auth')) {
            if(safety.decodeToken(req.header('Auth')).data.name === "admin") {
                getUsers(sequelize).then(users => {
                    res.send({users:users})
                })
            }
    }
    else {
        res.send("Not authorized")
    }
})

router.post('/addChapter' , (req ,res) => {
    if(req.header('Auth')) {
        writeChapterInst(sequelize , req.body.book_name , req.body.name , req.body.text).then(result => {
            res.send("Added")
        })
    }
    else {
        res.send("Not authorized")
    }
})

router.get('/getBookTags' , (req ,res) => {
        getBookTags(req.header('bookName') , sequelize).then(result=> {
            res.send(result)
        })
})

router.get('/getBookProps' , (req ,res) => {
    getBookProps(req.header('bookName') , sequelize).then(book=> {
        res.send({topic: book.book_genre , description: book.book_descr})
    })
})

router.get('/deleteFanfic' , (req ,res) => {
    if(req.header('Auth')) {
        deleteFanfic(sequelize , req.header('book_name')).then(()=> {
            res.send("deleted")
        })
    }
    else {
        res.send("Not authorized")
    }
})

router.post('/deleteUser' , (req ,res) => {
    if(req.header('Auth')) {
        if(safety.decodeToken(req.header('Auth')).data.name === "admin") {
            deleteUser(sequelize , req.body.user_name).then(()=> {
                res.send("deleted")
            })
        }
        else {
            res.send("Not admin")
        }
    }
    else {
        res.send("Not authorized")
    }
})

router.post('/block' , (req ,res) => {
    if(req.header('Auth')) {
        // if(safety.decodeToken(req.header('Auth')).data.name === "admin") {
            blockUser(sequelize , req.body.user_name, req.body.status).then(()=> {
                res.send("blocked/unblocked")
            })
        // }
        // else {
        //     res.send("Not admin")
        // }
    }
    else {
        res.send("Not authorized")
    }
})


router.post('/addLike' , (req ,res) => {
    if(req.header('Auth')) {
        checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(
            user => {
                if(user) {
                    if(req.body.user_liked) {
                        console.log(req.header('user_liked'))
                        addLike(sequelize , user.name, req.header('book_name') , "true")
                    }
                    else {
                        addLike(sequelize , user.name, req.header('book_name') , "false")
                    }
                }
            }
        )
    }
})

router.get('/getLike' , (req ,res) => {
    if(req.header('Auth')) {
        getLikes(sequelize , req.header('book_name')).then(likes => {
            console.log(likes)
            res.send({likes:likes})
        })
    }
})

module.exports = router