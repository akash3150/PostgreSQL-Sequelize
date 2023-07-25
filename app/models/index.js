const dbConfig = require("../config/index.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user/index.js")(sequelize, Sequelize);
db.userPics = require("./userPics/index.js")(sequelize, Sequelize);
db.userPics.belongsTo(db.users, { as: 'userPics', foreignKey: 'id' });
db.users.hasMany(db.userPics, { foreignKey: 'userId' });


module.exports = db;