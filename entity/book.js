exports.initBook = (Sequelize , sequelize) => {
    const Book = sequelize.define('book', {
        book_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        book_name: {
            type: Sequelize.STRING
        },
        book_descr :{
            type: Sequelize.STRING
        },
        book_genre : {
            type: Sequelize.STRING
        },
        quant_of_ratings : {
            type: Sequelize.INTEGER ,
            defaultValue: 0
        },
        cur_rating : {
            type : Sequelize.INTEGER ,
            defaultValue: 0
        }
    });
    return Book
}


