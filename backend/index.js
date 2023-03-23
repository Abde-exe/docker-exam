const express = require("express");
const config = require("./db.config");

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: config.HOST,
    port: config.PORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
});

const cors = require("cors");
const app = express();

const port = 4001
app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  const todos = await db.select('*').from('todos');
  res.json(todos);
  //res.send([]) // to remove after question 1)
});

app.post("/todos", async (req, res) => {
  const { name, description } = req.body;
  const result = await db('todos').insert({ name, description });
  res.json(result);

});

app.delete("/todos/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const result = await db('todos').where({ id: todoId }).delete();
    res.send(`Todo with id ${todoId} has been deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
