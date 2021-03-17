exports.initBookTag = (Sequelize , sequelize) => {
    const BookTag = sequelize.define('book-tag', {
        book_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Book
}