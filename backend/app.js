global.log = console.log;

const express = require("express");
const { sequelize } = require("./config/dbconfig.js");
const { Task } = require("./models/task.js");

app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/todos", async (req, res) => {
    return res.json((await Task.findAll()).map((element) => element.toJSON()));
});

app.get("/todos/:id", async (req, res) => {
    let insertedTask = await Task.findByPk(req.params.id);
    if (insertedTask != null) {
        return res.json(insertedTask.toJSON());
    } else {
        return res.sendStatus(404);
    }
});

app.put("/todos/:id", async (req, res) => {
    let task = await Task.findByPk(req.params.id);
    if (task != null) {
        task.body = req.body.body;
        task.done = req.body.done;
        task.save();
        return res.sendStatus(200);
    } else {
        return res.sendStatus(404);
    }
});

app.delete("/todos/:id", async (req, res) => {
    let taskToDestroy = await Task.findByPk(req.params.id);
    await taskToDestroy.destroy();
    return res.sendStatus(200);
});

app.post("/todos/", async (req, res) => {
    await Task.create(req.body);
    return res.sendStatus(200);
});

const APP_PORT = 3000;

app.listen(APP_PORT, () => {
    log(`app active on port ${APP_PORT}`);
});
