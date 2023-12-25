"use client";
import React from 'react';
import {useTodo} from "@/store/todos";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {useSearchParams} from "next/navigation";

const Todos = () => {
    const {todos,toggleTodoAsComplete,deleteTodo} = useTodo();
    let filterTodos = todos;

    const searchParams = useSearchParams();
    const todosFilter = searchParams.get("todos");
    if(todosFilter === "active"){
        filterTodos = todos.filter((todo)=>!todo.completed);
    }
    if(todosFilter === "completed"){
        filterTodos = todos.filter((todo)=>todo.completed);
    }


    return (
        <ul>
            {
                filterTodos.map((todo) => {
                    return <li key={todo.id}>

                            <input type={"checkbox"} id={todo.id} onChange={()=>toggleTodoAsComplete(todo.id)} checked={todo.completed}/>
                            <label htmlFor={todo.id}>{todo.text}</label>
                        {todo.completed && (<button onClick={()=>deleteTodo(todo.id)} >Delete</button>)}

                    </li>
})
            }

        </ul>
    );
};

export default Todos;