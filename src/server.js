const express = require("express");
const app = express();
const tasks = [];

app.use(express.json());

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(task);
    res.status(201).json(task);
});

app.listen(3000, () => {
    console.log("Task Flow rodando na porta 3000");
});

