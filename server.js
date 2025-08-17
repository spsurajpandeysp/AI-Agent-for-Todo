const express = require('express')
const todoRouters =  require('./routes/todo.route');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json())

app.get("/health",(req,res)=>{
    res.status(200).json({status:"Running"})
})


app.use('/api',todoRouters)

app.listen(4000,()=>{
    console.log("server running to port: 4000")
})