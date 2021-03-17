exports.initTopic = (Sequelize , sequelize) => {
    const Topic = sequelize.define('topic', {
        topic_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        topic : {
            type: Sequelize.STRING
        }
    });
    return Topic
}