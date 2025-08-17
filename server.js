import {db} from './db'

import {todosTable} from './db/schema'

// tools

async function getAllTodos(){
    const todos = await db.select().from(todosTable);
    return todos;
}

async function createTodo(todo) {
    await db.insert(todosTable).values({
        todo
    })
}