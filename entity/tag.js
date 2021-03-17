exports.initTag = (Sequelize , sequelize) => {
    const Tag = sequelize.define('tag', {
        tag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag: {
            type: Sequelize.STRING
        }
    });
    return Tag
}
