const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({ dialect: "sqlite", storage: "./db.sqlite" });

async function testDbConnection() {
    try {
        await sequelize.authenticate();
        console.log(
            "Connection to database has been established successfully."
        );
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

testDbConnection();

module.exports = { sequelize };
