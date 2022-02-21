const mongoose = require("mongoose");

module.exports = function () {
    mongoose
        .connect("mongodb://localhost/todo")
        .then(() => console.log("Connected to mongo db"))
        .catch((error) => console.log(error));
};
