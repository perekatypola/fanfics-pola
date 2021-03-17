const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./sqlwork')
const path = require('path')
// const Sequelize = require('sequelize')
// const {initBook} = require("./entity/book");
// const {initChapter} = require("./entity/chapter");
// const {initComment} = require("./entity/comment");
// const {initUser} = require("./entity/user");
// const {writeBookInst , setChapter , getChaptersList , setConnection ,
//     getComments , loadWorks , loadChapter , addUser , validatePassword , checkUser , getUserBooks , addComment,
//     loadBook,getChapters , getTags , addTags , addTagsToBook , getBookTags , setRating , getRating , deleteFanfic , setRatingToBook,
//     addLike , getLikes} = require ("./sqlwork")
// const safety = require('./safety')
// const {getTopics} = require("./sqlwork");
// const {initTopic} = require("./entity/topic");
// const fullText = require("./full-text-search")
// const {writeChapterInst} = require("./sqlwork");
// const sequelize = setConnection()

const app = express()
const port = process.env.PORT || 8080
const router = require('./router')
app.use(cors())
app.use('/' , router)
app.use(bodyParser.json())

// app.get('/reg' , (req , res) => {
//     addUser(req.header('name') , req.header('password') , req.header('email') , sequelize).then(result => {console.log(result)})
// })
// app.get('/auth' , (req , res) => {
//     checkUser(req.header('name') , sequelize).then((user) => {
//         if(user) {
//             safety.validatePassword(req.header('password') , user.password).then(async (a) => {
//                 if(a) {
//                      if(user.status === "unblocked") {
//                          let hashedPassword =  await safety.hashPassword(req.header('password'))
//                          let dataForJwt = {name :req.header('name') , password: hashedPassword}
//                          let jwtRes = safety.generateToken(dataForJwt)
//                          console.log(jwtRes)
//                          res.send(jwtRes)
//                      }
//                      else {
//                          res.send("blocked")
//                      }
//                 }
//                 else {
//                     res.send("invalid")
//                 }
//             })
//         }
//     })
// })
//
// app.get('/loadUserWorks' , (req , res) => {
//     if(req.header('Auth')) {
//         checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(
//             user => {
//                 getUserBooks(user).then(books => {
//                     res.send(books)
//                 })
//             }
//         )
//     }
//     else {
//         res.send("Not authorized")
//     }
// })
//
// app.get('/search' , (req , res) => {
//     const Chapter  = initChapter(Sequelize , sequelize)
//     fullText.searchFromBooks(req.header('searchText') , sequelize)
//         .then(result=> {console.log(result)
//         res.send(result)})
// })
//
// app.get('/setRating' , (req , res) => {
//     if(req.header('Auth')) {
//         checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(
//             user => {
//                 if(user) {
//                     setRating(sequelize , user.name , req.header('book_name') , req.header('user_rating')).then(result=> {
//                     })
//                 }
//             }
//         )
//     }
// })
//
// app.get('/getRating' , (req , res) => {
//     getRating(sequelize , req.header('book_name')).then(ratings => {
//         if(ratings) {
//             const rating = ratings.reduce((sum , cur) => {
//                 return sum + cur.rating
//             } , 0)
//             const finalRating = rating/ratings.length
//             setRatingToBook(sequelize , finalRating , req.header('book_name'))
//             res.send({rating: finalRating})
//         }
//     })
// })
//
// app.get('/loadTopics' , (req , res) => {
//     if(req.header('Auth')) {
//         getTopics(sequelize).then(result => {
//             res.send(result)
//         })
//     }
// })
//
// app.get('/loadTags' , (req , res) => {
//     if(req.header('Auth')) {
//         getTags(sequelize).then(result => {
//             res.send(result)
//         })
//     }
// })
//
// app.get('/addComment' , (req , res) => {
//     addComment(req.header('name') , req.header('text') , sequelize , req.header('book')).then(result=>res.send(result))
// })
//
// app.get('/loadRecentWorks' , (req , res) => {
//     const Book = initBook(Sequelize , sequelize)
//     const Comment = initComment(Sequelize , sequelize)
//     Book.hasMany(Comment)
//     loadWorks(Book).then(result => {
//         res.send(result)
//     })
// })
// app.get('/loadChapters' , (req , res) => {
//     const Book = initBook(Sequelize , sequelize)
//     const Chapter = initChapter(Sequelize , sequelize)
//     Book.hasMany(Chapter)
//     getChaptersList(Book , req.header('bookName')).then((result) => {
//         res.send(result)
//     })
// })
//
// app.get('/loadComments' , (req , res) => {
//     const Book = initBook(Sequelize , sequelize)
//     const Comment = initComment(Sequelize , sequelize)
//     Book.hasMany(Comment)
//     if(req.header('Auth') !== "") {
//         checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(
//             getComments(Book , req.header('bookName')).then((result) => {
//                 res.send(result)
//             })
//         )
//     }
//     else {
//         res.send("Not authorized")
//     }
// })
//
// app.get('/loadWorks' , (req , res) => {
//     const Book = initBook(Sequelize , sequelize)
//     const Comment = initComment(Sequelize , sequelize)
//     Book.hasMany(Comment)
//     loadWorks(Book).then(result => {
//         res.send(result)
//     })
// })
//
// app.get('/loadChapter' , (req ,res) => {
//     const Book = initBook(Sequelize, sequelize)
//     const Chapter = initChapter(Sequelize, sequelize)
//     Book.hasMany(Chapter)
//     loadChapter(Book , req.header('chapterName') , req.header('bookName')).then(result => {
//         res.send(result)
//     })
// })
//
// app.post('/addBook' , (req ,res) => {
//     if(req.header('Auth')) {
//         checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(user=> {
//             if(user) {
//                 console.log(user.user_id)
//                 writeBookInst(req.header('name') , req.header('descr') , user.user_id , req.header('topic'),sequelize).then(result => {
//                     console.log(result)
//                     req.body.tags.forEach(tag => {
//                         addTags(sequelize , tag , result.book_id)
//                     })
//                     res.send("Added")
//                 })
//             }
//             else {
//                 res.send("no user")
//             }
//         })
//     }
//     else {
//         res.send("Not authorized")
//     }
// })
//
// app.get('/addChapter' , (req ,res) => {
//     if(req.header('Auth')) {
//         writeChapterInst(sequelize , req.header('book_name') , req.header('name') , req.header('text')).then(result => {
//             res.send("Added")
//         })
//     }
//     else {
//         res.send("Not authorized")
//     }
// })
//
// app.get('/getBookTags' , (req ,res) => {
//     if(req.header('Auth')) {
//         getBookTags(req.header('bookName') , sequelize).then(result=> {
//             res.send(result)
//         })
//     }
//     else {
//         res.send("Not authorized")
//     }
// })
//
// app.get('/deleteFanfic' , (req ,res) => {
//     if(req.header('Auth')) {
//         deleteFanfic(sequelize , req.header('book_name')).then(()=> {
//             res.send("deleted")
//         })
//     }
//     else {
//         res.send("Not authorized")
//     }
// })
//
// app.get('/addLike' , (req ,res) => {
//     if(req.header('Auth')) {
//         checkUser(safety.decodeToken(req.header('Auth')).data.name , sequelize).then(
//             user => {
//                 if(user) {
//                     if(req.header('user_liked') === "true") {
//                         addLike(sequelize , user.name, req.header('book_name') , "true")
//                     }
//                     else {
//                         addLike(sequelize , user.name, req.header('book_name') , "false")
//                     }
//                 }
//             }
//         )
//     }
// })
//
// app.get('/getLike' , (req ,res) => {
//     if(req.header('Auth')) {
//         getLikes(sequelize , req.header('book_name')).then(likes => {
//             res.send({likes:likes})
//         })
//     }
// })

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('fanfics/build'))

    app.get('*' , (req,res) => {
        res.sendFile(path.join(__dirname , 'fanfics' , 'build' , 'index.html'))
    })
}

app.listen(process.env.PORT || port, () => {
    console.log('Server running')
})

// fullText.indexing(Sequelize, sequelize)
//
// const intervalId = setInterval(fullText.indexing , 1800000)






