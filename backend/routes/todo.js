const express = require("express");
const router = express.Router();

const Todo = require("../model/todo");

router.get("/", async (req, res) => {
    try {
        const todo = await Todo.find();
        res.status(200).send(todo);
    } catch (error) {
        res.send(error.message);
    }
});

router.post("/", async (req, res) => {
    const title = req.body.title;

    const todo = new Todo({
        title: title,
    });

    try {
        await todo.save();
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(400).send("No todo with the given ID");

    todo.selected = !todo.selected;
    try {
        await todo.save();
        res.status(200).send(todo);
    } catch (error) {
        res.send(error.message);
    }
});

// delete a single todo
router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndRemove(req.params.id);
        res.status(200).send(todo);
    } catch (error) {
        res.send(error.message);
    }
});

// delete many todo
router.delete("/", async (req, res) => {
    const selectedTodo = req.body.selectedTodo;
    const selectedTodoLength = selectedTodo.length;
    if (selectedTodoLength === 0) return;
    const todos = [];

    for (let i = 0; i < selectedTodoLength; i++) {
        try {
            const todo = await Todo.findByIdAndRemove(selectedTodo[i]._id);
            todos.push(todo);
        } catch (error) {
            res.send(error.message);
        }
    }

    if (todos.length === selectedTodoLength) {
        res.status(200).send(todos);
    }
});

module.exports = router;
