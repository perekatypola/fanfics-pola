const db = require('../sqlwork')


exports.initComment = (Sequelize , sequelize) => {
    const Comment = sequelize.define('comment', {
        comment_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.TEXT
        },
        comment_text :{
            type: Sequelize.STRING
        }
    });
    return Comment
}