const express = require("express");
const app = express();
const cors = require("cors");
const todo = require("./routes/todo");

app.use(cors());
app.use(express.json());

require("./db")();
app.use("/todo", todo);

app.get("/", (req, res) => {
    res.send("hello world");
});

let port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
