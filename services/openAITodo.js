const {OpenAI}  = require("openai");
const readlineSync = require('readline-sync')
// const { getAllTodos } = require("../controllers/todo.controller");
const client = new OpenAI();

function getAllTodos(){

}
function createTodo(todo){
    
}

function searchTodo(id){
    
}

function deleteTodoById(search){
    
}


function OpenAITodo() {

    const tools = {
        getAllTodos: getAllTodos,
        createTodo: createTodo,
        deleteTodoById: deleteTodoById,
        searchTodo: searchTodo,
    }

    const SYSTEM_PROMPT = `
            You can manage tasks by adding, viewing, updating, and deleting,
            you mush strictly follow the json output format.

            You are an AI To-Do List Assistant. you are an AI Assistent with START, PLAN, ACTION, Obervation and Output State.
            Wait for the user Prompt and first PLAN using available tools
            After Plaining, Take the action with appropriate tools and wait for Observation based on Action.
            Once you get the Observation, Reaturn the AI response based on START propmt and observations

            Todo DB Schema:
            id: Int and Primary Key
            todo: String
            created_at: Date Time
            updated_at: Date Time

            Available Tools:
            - getAllTodos(): Returns all the Todos from Database
            - createTodo(todo: string): Creates a new Todo in the DB and takes todo as a string
            - deleteTodo(id:string): Delete the todo by ID given in the DB
            - searchTodo(query:string): Searches for all todos matching the query string using i like operator


            Example:

            START
            {"type": "user", "user": "Add a task for shopping groceries."}
            {"type": "plan", "plan": "I will try to get more context on what user needs to shop."}
            {"type": "output", "output": "Can you tell me what all intems you want to shop for?."}
            {"type": "user", "user": "I want to shop for milk, kurkure, lays and choco."}
            {"type": "plan", "plan": " I will use createTodo to create a new Todo in DB."}
            {"type": "action", "function": "createTodo", "input": "Shopping for milk, Kurkure, lays, and choco."}
            {"type": "observation", "observation": "2"}
            {"type": "output": "Your todo has been added successfully"}
        `
}



const messages = [{role: 'system',content: SYSTEM_PROMPT}]


while (true){
    const query = readlineSync.question('>>');
    const userMessage = {
        type:'user',
        user:query
    }
     messages.push({role:'user',content:JSON.stringify(userMessage)}); 

    while(true){
        const chat =  await client.chat.completions.create({
            model:'gpt-4o',
            messages:messages,
            response_format:{type:'json_object'},
        })

        const result = chat.choices[0].message.content;
        messages.push({role:'assistant',content:result})

        const action = json.parse(result);

        if(action.type === 'output'){
            console.log(`Output: ${action.output}`);
            break;
        }
        else if(action.type === "action"){
            const fn = tools[action.function];
            if(!fn){
                throw new Error('Invalid Tool Call')
            }

            const observation = {
                type: 'observation',
                observation:observation,
            }

            messages.push({role:'developer',content:json.stringify(observationMessage)});


        }
    }
}