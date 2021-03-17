const argon2 = require('argon2')
const sql =  require("./sqlwork")
const jwt = require('jsonwebtoken')
// const jwt_decode  = require("jwt-decode")

exports.hashPassword = async (password) => {
    return await argon2.hash(password);
}

exports.validatePassword =  (passwordToCheck , password) => {
    return new Promise((resolve , reject) => {
            argon2.verify(password, passwordToCheck).then((result) => {
                if (result) {
                    resolve(result)
                }
            })
        })

}

exports.generateToken = (data) => {
    let signature = 'Noy4Gh67Fsd'
    return jwt.sign({data} , signature , {expiresIn : '6h'})
}

exports.decodeToken = (token) => {
    return jwt.decode(token)
}