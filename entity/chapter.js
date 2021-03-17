exports.initChapter = (Sequelize,sequelize) => {
    return sequelize.define('chapter', {
        chapter_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        chapter_name: {
            type: Sequelize.STRING
        },
        text :{
            type: Sequelize.TEXT
        },
    });
}
