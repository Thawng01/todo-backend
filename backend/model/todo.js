const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
    },

    date: {
        type: Date,
        default: Date.now,
    },
    selected: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todos", todoSchema);

module.exports = Todo;
