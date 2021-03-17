exports.initUser = (Sequelize , sequelize) => {
    const User = sequelize.define('user', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        password :{
            type: Sequelize.STRING
        },
        email : {
            type: Sequelize.STRING
        },
        status : {
            type: Sequelize.STRING,
            defaultValue: "unblocked"
        }
    });
    return User
}
