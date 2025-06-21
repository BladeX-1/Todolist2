const { sequelize } = require("../config/dbconfig.js");
const { DataTypes } = require("sequelize");
const sampleData = require("../sample/tasks.json");

const Task = sequelize.define("Task", {
    body: {
        allowNull: false,
        unique: false,
        type: DataTypes.STRING,
        defaultValue: "",
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

log(sampleData);

async function createTableAndFillSampleData() {
    await sequelize.sync({ force: false });
    for (let i = 0; i < sampleData.length; i++) {
        let data = sampleData[i];
        log(data);
        newTask = await Task.create(data);
    }
}

createTableAndFillSampleData();
module.exports = { Task };
