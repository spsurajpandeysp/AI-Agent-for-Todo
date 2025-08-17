

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 


const createTodo = async(req,res) => {
      console.log(req.body)
    const todoName =  req.body.todo;
  
    try{
        const todo = await prisma.todo.create({
            data:{
                todo:todoName,
            }
        })
        res.status(200).json({msg:"Todo Created",data:{id:todo.id,todoName:todo.name}})
    }
    catch(error){
        res.status(500).json({msg:"Error While Creating Todo",error:error.message})
    }
}


const getAllTodos  = async(req,res) =>{
    try{
       const todos = await prisma.todo.findMany();
       res.status(200).json({msg:"Todos Sucesfully Fetched",data:{todos}})
    }
    catch(error){
        res.status(500).json({msg:"Error Getting Todos",error:error.message})
    }
}


const deleteTodo  = async(req,res) =>{
    try{
        console.log(req)
       const todos = await prisma.todo.delete({
        where:{todo:req.params.todo}
       });
       res.status(200).json({msg:"Todos Deleted Sucesfully",data:{todos}})
    }
    catch(error){
        res.status(500).json({msg:"Error while Deleting todo",error:error.message})
    }
}


const updateTodo = async (req, res) => {
  try {
    console.log(req.params);

    const todos = await prisma.todo.update({
      where: { todo: req.params.todo },   // use "id" (must be unique)
      data: { todo: req.params.newTodo }          // Prisma uses "data", not $set
    });

    res.status(200).json({ msg: "Todo Successfully Updated", data: todos });
  } catch (error) {
    res.status(500).json({ msg: "Error updating todo", error: error.message });
  }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
}