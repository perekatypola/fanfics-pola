const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./sqlwork')
const path = require('path')
const {setConnection} = require('./sqlwork')
const Sequelize = require('sequelize')
const sequelize = setConnection()
const app = express()
const fullText = require('./full-text-search')
const port = process.env.PORT || 8080
const router = require('./router')
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/' , router)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('fanfics/build'))

    app.get('*' , (req,res) => {
        res.sendFile(path.join(__dirname , 'fanfics' , 'build' , 'index.html'))
    })
}

app.listen(process.env.PORT || port, () => {
    console.log('Server running')
})

fullText.indexing(Sequelize , sequelize)
// const intervalId = setInterval(fullText.addIndex , 1800000)






