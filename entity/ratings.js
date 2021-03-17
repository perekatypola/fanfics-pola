exports.initRating = (Sequelize , sequelize) => {
    const Rating = sequelize.define('rating', {
        user_name: {
            type: Sequelize.STRING
        },
        rating :{
            type: Sequelize.INTEGER
        },
        book_name : {
            type: Sequelize.STRING
        }
    });
    return Rating
}