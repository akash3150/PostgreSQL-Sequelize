

module.exports = (sequelize, Sequelize) => {
    const userPics = sequelize.define("userPics", {
        url: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'pending'
        }
    });
    return userPics;
};