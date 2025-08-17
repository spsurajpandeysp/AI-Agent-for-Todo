const express = require('express')
const todo = require("../controllers/todo.controller")

const router = express.Router()




router.get("/",todo.getAllTodos)
    .post("/",todo.createTodo)
    .put("/:todo/:newTodo",todo.updateTodo)
    .delete("/:todo",todo.deleteTodo)


module.exports = router