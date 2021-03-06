const Sequelize = require('sequelize');
const {initBook} = require("./entity/book");
const {initChapter} = require("./entity/chapter");
const {initComment} = require("./entity/comment");
const {initUser} = require("./entity/user")
const {initTag} = require("./entity/tag")
const {initRating} = require("./entity/ratings")
const {initLike} = require("./entity/like")
const Safety = require("./safety")
const mysql = require("mysql2");
const {initTopic} = require("./entity/topic");

connect = () =>{
    const sequelize = new Sequelize('heroku_28d73c2b5002cce', 'bf9cab5703465e', '5c8706ef', {
        host: 'eu-cdbr-west-03.cleardb.net',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });
    return sequelize;
}

exports.setConnection = () => {
    const sequelize = connect()
    sequelize.authenticate()
        .then(()=>{
            console.log("connecting")
            const User = initUser(Sequelize , sequelize)
            const Book = initBook(Sequelize , sequelize)
            const Chapter = initChapter(Sequelize , sequelize)
            const Comment = initComment(Sequelize , sequelize)
            const Topic = initTopic(Sequelize , sequelize)
            const Tag = initTag(Sequelize , sequelize)
            const Rating = initRating(Sequelize , sequelize)
            initLike(Sequelize , sequelize)
            Book.hasMany(Chapter)
            Book.hasMany(Comment)
            Tag.belongsToMany(Book , {through : 'Book_Tag'})
            Book.belongsToMany(Tag , {through : 'Book_Tag'})
            User.hasMany(Book)
            Chapter.belongsTo(Book)
            Comment.belongsTo(Book)
            sequelize.sync().then(result=>{
            }).catch(err=> console.log(err));
        })
    return sequelize
}

exports.writeBookInst = (name , descr, user , topic ,sequelize) => {
   return new Promise((resolve, reject) => {
       const User = initUser(Sequelize , sequelize)
       const Book = initBook(Sequelize , sequelize)
       User.hasMany(Book)
       User.findOne({where:{name:user}}).then(user=> {
           user.createBook({book_name: name , book_descr : descr , book_genre : topic}).then(res => {resolve(res)})
       })
   })
}

exports.writeChapterInst = (sequelize, book_name , name , text) => {
    return new Promise((resolve, reject) => {
        const Book = initBook(Sequelize ,sequelize)
        const Chapter = initChapter(Sequelize , sequelize)
        Book.hasMany(Chapter)
        console.log(book_name)
        Book.findOne({where : {book_name : book_name}}).then(book => {
            console.log("hhh")
            book.createChapter({
                chapter_name:name,
                text: text
            }).then(res => {
                resolve(res)
            })
        }).catch(err=>console.log(err));
    })
}

exports.addTags =  (sequelize, tag , id , suggestions) => {
    return new Promise((resolve, reject) => {
        const Book = initBook(Sequelize ,sequelize)
        const Tag = initTag(Sequelize , sequelize)
        Tag.belongsToMany(Book , {through : 'Book_Tag'})
        Book.belongsToMany(Tag , {through : 'Book_Tag'})

        if(suggestions.findIndex(el => el.id === tag.id)>=0) {
            console.log("tag is in sug")
            Tag.findOne({where: {tag: tag.text}}).then(foundTag => {
                console.log(foundTag)
                Book.findByPk(id).then(book => {
                    book.addTag(foundTag, {through: {bookBookId : id}}).then(res=> {
                        console.log(res)
                        resolve(res)
                    })
                })
            })
        }
        else {
            Tag.create({tag: tag.text}).then(createdTag => {
                Book.findByPk(id).then(book => {
                    book.addTag(createdTag , {through: {bookBookId : id}}).then(res=> {
                        resolve(res)
                    })
                })
            })
        }
    })
}
exports.addTagsToBook = (sequelize, tag , id) => {
    return new Promise((resolve, reject) => {
        const Book = initBook(Sequelize ,sequelize)
        const Tag = initTag(Sequelize , sequelize)
        Tag.belongsToMany(Book , {through : 'Book_Tag'})
        Book.belongsToMany(Tag , {through : 'Book_Tag'})
        Book.findByPk(id).then(book => {
            Tag.findOne({where : {tag:tag}}).then(foundTag => {
                book.addTag(foundTag , {through: {bookBookId : id}}).then(res=> {
                    resolve(res)
                })
            })
        })
    })
}
exports.getBookTags = (name , sequelize) => {
    return new Promise((resolve, reject) => {
        const Book = initBook(Sequelize ,sequelize)
        const Tag = initTag(Sequelize , sequelize)
        Tag.belongsToMany(Book , {through : 'Book_Tag'})
        Book.belongsToMany(Tag , {through : 'Book_Tag'})
        Book.findOne({where : {book_name: name}}).then(book => {
            console.log(book)
            book.getTags().then(tags=> {
                console.log(tags)
                resolve(tags)
            })
        })
    })
}

exports.editBookInst = (name , descr, prevName , sequelize, topic) => {
    return new Promise((resolve, reject) => {
        const Book = initBook(Sequelize ,sequelize)
        const Tag = initTag(Sequelize , sequelize)
        Tag.belongsToMany(Book , {through : 'Book_Tag'})
        Book.belongsToMany(Tag , {through : 'Book_Tag'})
        Book.update({book_name: name , book_descr : descr, book_genre: topic},{where : {book_name: prevName}}).then(book => {
            Book.findOne({where: {book_name: name}}).then(result => {
                resolve(result)
            })
        })
    })
}

exports.editChapterInst = (name , text, prevName , book_name , sequelize) => {
    return new Promise((resolve, reject) => {
        const Chapter = initChapter(Sequelize ,sequelize)
        const Book = initBook(Sequelize ,sequelize)
        Book.hasMany(Chapter)
        Chapter.belongsTo(Book)
        Book.findOne({where:{book_name:book_name}}).then(book =>{
            console.log(book.book_id)
            Chapter.findOne({where:{bookBookId:book.book_id , chapter_name: prevName}}).then(chapter => {console.log(chapter)})
            Chapter.update({text:text, chapter_name:name},{where:{bookBookId: book.book_id, chapter_name: prevName}}).then(()=> {})
        })
    })
}

exports.getChaptersList = (Book , name) => {
    return new Promise((resolve , reject) => {
        Book.findOne({where : {book_name : name}})
            .then(book => {
                book.getChapters({raw:true}).then(res => {
                    resolve(res)
                })
            })
    })
}

exports.getChapters = (Chapter) => {
    return new Promise((resolve,reject) => {
        Chapter.findAll({raw:true})
            .then(chapters => {
                resolve(chapters)
            })
    })
}

exports.getChapter = (id , sequelize) => {
    return new Promise((resolve,reject) => {
        const Chapter = initChapter(Sequelize, sequelize)
        const Book = initBook(Sequelize , sequelize)
        Book.hasMany(Chapter)
        Chapter.belongsTo(Book)
        Chapter.findByPk(id).then(res=> {
            resolve(res);
        })
    })
}

exports.getComment = (id , sequelize) => {
    return new Promise((resolve,reject) => {
        const Comment = initComment(Sequelize, sequelize)
        const Book = initBook(Sequelize , sequelize)
        Book.hasMany(Comment)
        Comment.belongsTo(Book)
        Comment.findByPk(id).then(res=> {
            resolve(res);
        })
    })
}

exports.getBookById = (id,  sequelize) => {
    return new Promise((resolve,reject) => {
        const Book = initBook(Sequelize , sequelize)
        Book.findByPk(id)
            .then(book => {
                resolve(book)
            })
    })

}
exports.getBooks = (Book) => {
    return new Promise((resolve,reject) => {
        Book.findAll({raw:true})
            .then(books => {
                resolve(books)
            })
    })
}

// exports.getComments = (Comment) => {
//     return new Promise((resolve,reject) => {
//         Comment.findAll({raw:true})
//             .then(comments => {
//                 console.log(comments)
//                 resolve(comments)
//             })
//     })
// }

exports.getComments = (Book , name) => {
    return new Promise((resolve , reject) => {
        Book.findOne({where: {book_name:name}})
            .then(book => {
                book.getComments({raw:true}).then(res=> {
                    resolve(res)
                })
            })
    })
}

exports.loadWorks = (Book) => {
    return new Promise((resolve,reject) => {
        Book.findAll({raw:true})
            .then(books => {
            resolve(books)
        })
    })
}

exports.loadChapter = (Book , chapterName , bookName) => {
    return new Promise((resolve,reject) => {
        Book.findOne({where: {book_name:bookName}})
            .then(book => {
                book.getChapters({raw:true}).then((chapters) => {
                    chapters.forEach(ch => {
                        if(ch.chapter_name === chapterName) {
                            resolve(ch)
                        }
                    })
                })
            })
    })
}

exports.getTopics = (sequelize) => {
    return new Promise((resolve , reject) => {
        const Topic = initTopic(Sequelize , sequelize)
        Topic.findAll().then(res =>
                resolve(res))
    })
}

exports.getTags = (sequelize) => {
    return new Promise((resolve,reject) => {
        const Tag = initTag(Sequelize, sequelize)
        Tag.findAll().then(res=> {
            resolve(res);
        })
    })
}

exports.addUser =  async (name , password, email , sequelize) => {
    let hashedPassword = await Safety.hashPassword(password);
    return new Promise((resolve,reject) => {
        const User = initUser(Sequelize , sequelize)
        User.create({
            name:name,
            password: hashedPassword,
            email: email
        }).then(res =>{
            resolve(res)
                })
            })
}

exports.getUserInfo =  (name, sequelize) => {
    return new Promise((resolve,reject) => {
        console.log(name)
        const User = initUser(Sequelize , sequelize)
        User.findOne({where: {
            name: name
            }})
            .then(user => {resolve(user)}
        )
    })
}

exports.updateUser =  (name , prevName, info , contacts , sequelize) => {
    return new Promise((resolve,reject) => {
        console.log(prevName)
        const User = initUser(Sequelize , sequelize)
        User.update({
            name:name,
            contacts: contacts,
            info: info
        } , {where :
                {
                    name: prevName
                }}).then(res =>{
                    console.log(res)
            resolve(res)
        })
    })
}

exports.getUserBooks = (user) => {
    return new Promise((resolve , reject) => {
        user.getBooks({raw:true}).then(books => resolve(books))
    })
}

exports.checkUser = (name , sequelize) => {
    return new Promise((resolve,reject) => {
        const User = initUser(Sequelize , sequelize)
        const Book = initBook(Sequelize , sequelize)
        User.hasMany(Book)
        User.findOne({where: {name: name}})
            .then(user=>{
                if(!user) resolve(false);
                resolve(user)
            }).catch(err=>console.log(err));
    })
}

exports.getUsers = (sequelize) => {
    return new Promise((resolve,reject) => {
        const User = initUser(Sequelize , sequelize)
        User.findAll()
            .then(users=>{
                if(!users) resolve(false);
                resolve(users)
            }).catch(err=>console.log(err));
    })
}

exports.loadBook = (name , sequelize) => {
    return new Promise((resolve,reject) => {
        const Book = initBook(Sequelize , sequelize)
        Book.findOne({where: {book_name: name}})
            .then(book=>{
               resolve(book)
            }).catch(err=>console.log(err));
    })
}

exports.addComment = (name , text , sequelize , book_name) => {
    return new Promise((resolve , reject) => {
        const Book = initBook(Sequelize , sequelize)
        const Comment = initComment(Sequelize , sequelize)
        console.log(book_name)
        Book.hasMany(Comment)
        Book.findOne({where:{book_name:book_name}}).then(book => {
            book.createComment({username: name , comment_text: text}).then(res=> {resolve(res)}).catch(err=> reject(err))
        })
    })
}

exports.setRating = (sequelize, user_name, book_name , rating) => {
    return new Promise((resolve , reject) => {
        const Rating = initRating(Sequelize , sequelize)
        Rating.findOne({where:{user_name:user_name , book_name: book_name}}).then(res => {
            if(res) {
                Rating.update({rating: rating} ,
                    {
                        where : {
                            user_name:user_name ,
                            book_name: book_name
                        }
                    })
            }
            else {
                Rating.create({rating: rating , user_name:user_name , book_name: book_name})
            }
        })
    })
}

exports.getUserRating = (sequelize, book_name, user_name) => {
    return new Promise((resolve , reject) => {
        const Rating = initRating(Sequelize , sequelize)
        Rating.findOne({where:{user_name:user_name , book_name: book_name}}).then(res => {
            resolve(res.rating)
        })
    })
}

exports.addLike = (sequelize, user_name, book_name , liked) => {
    return new Promise((resolve , reject) => {
        const Like = initLike(Sequelize , sequelize)
        Like.findOne({where:{user_name:user_name , book_name: book_name}}).then(res => {
            console.log(res)
            if(res) {
                Like.update({like: liked} ,
                    {
                        where : {
                            user_name:user_name ,
                            book_name: book_name
                        }
                    })
            }
            else {
                console.log("creating")
                Like.create({like: liked , user_name:user_name , book_name: book_name})
            }
        })
    })
}

exports.setRatingToBook = (sequelize , rating , book_name) => {
    return new Promise((resolve , reject) => {
        const Book = initBook(Sequelize , sequelize)
        Book.update(
            {cur_rating:rating} ,
            {
                where: {
                book_name: book_name
            }
        }).then(res=> {
            resolve(res)
        })
    })
}

exports.getRating = (sequelize , book_name)=> {
    return new Promise((resolve , reject) => {
        const Rating = initRating(Sequelize , sequelize)
        Rating.findAll({where:{book_name: book_name}}).then(ratings => {
            if(ratings) {
                console.log(ratings)
                resolve(ratings)
            }
        })
    })
}

exports.getLikes = (sequelize , book_name) => {
    return new Promise((resolve, reject) => {
        const Like = initLike(Sequelize, sequelize)
        Like.findAll({
            where:
                {
                    book_name: book_name,
                    like: "true"
                }
        })
            .then(likes => {
                resolve(likes.length)
            })
    })
}

exports.deleteFanfic = (sequelize , book_name) => {
    return new Promise((resolve, reject) => {
        const Book = initBook(Sequelize , sequelize)
        Book.findOne(
            {where:
                {
                    book_name:book_name
                }
            })
            .then(book => {
                book.destroy()
                resolve(book)
            })
    })
}

exports.deleteUser = (sequelize , user_name) => {
    return new Promise((resolve, reject) => {
        const User = initUser(Sequelize , sequelize)
        const Book = initBook(Sequelize , sequelize)
        User.hasMany(Book)
        User.findOne(
            {where:
                    {
                        name:user_name
                    }
            })
            .then(user => {
                user.getBooks().then(books => {
                    books.forEach(book => {
                        console.log(book)
                        book.destroy()
                    })
                    user.destroy()
                    console.log(user)
                    resolve(user)
                })
            })
    })
}

exports.blockUser = (sequelize , user_name , status) => {
    return new Promise((resolve, reject) => {
        const User = initUser(Sequelize , sequelize)
        let newStatus
        if(status === "unblocked") {
            newStatus = "blocked"
        }
        else {
            newStatus = "unblocked"
        }
        User.update(
            {status : newStatus},
            {where:
                    {
                        name:user_name
                    }
            })
            .then(()=> {
                User.findOne({where: {
                    name: user_name
                    }})
                    .then(user => {
                        console.log(user)
                        resolve(user)
                    })
            })
    })
}

exports.getBookProps = (book_name , sequelize) => {
    return new Promise((resolve, reject) => {
        const Book = initBook(Sequelize , sequelize)
        Book.findOne(
            {where:
                    {
                        book_name:book_name
                    }
            })
            .then(book => {
                resolve(book)
            })
    })
}