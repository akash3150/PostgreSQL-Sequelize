module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        deletedAt: 'deletedAt',
        timestamps: true
    });

    return User;
};