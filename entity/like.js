exports.initLike = (Sequelize , sequelize) => {
    const Like = sequelize.define('like', {
        user_name: {
            type: Sequelize.STRING
        },
        like :{
            type: Sequelize.STRING
        },
        book_name : {
            type: Sequelize.STRING
        }
    });
    return Like
}