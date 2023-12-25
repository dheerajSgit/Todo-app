"use client";

import {createContext, ReactNode, useContext, useState} from "react";

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}
export type TodoContextType = {
    todos: Todo[];
    handleAddTodo: (todo: string) => void;
    toggleTodoAsComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
}

export const todocontext = createContext<TodoContextType | null>(null)

export const TodoProvider = ({children}: { children: ReactNode }) => {

    const [todos, setTodos] = useState<Todo[]>(()=>{
        const todos = localStorage.getItem("todos")||"[]";
        return JSON.parse(todos);
    });
    const handleAddTodo = (todo: string) => {
        setTodos((prevTodos) => {
            const newTodos: Todo[] = [{

                id: Math.random().toString(),
                text: todo,
                completed: false,
                createdAt: new Date(),

            }, ...prevTodos];
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;

        });
    }
    const toggleTodoAsComplete = (id: string) => {
        setTodos((prevTodos) => {
            const newTodos = prevTodos.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            completed: !todo.completed,
                        };
                    }
                    return todo;
                }
            );
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        });
    }


        const deleteTodo = (id: string) => {
            setTodos((prevTodos) => {
                const newTodos = prevTodos.filter((todo) => todo.id !== id);
                localStorage.setItem("todos", JSON.stringify(newTodos));
                return newTodos;
            });
        }

    return (
        <todocontext.Provider value={{todos, handleAddTodo,toggleTodoAsComplete,deleteTodo}}>
            {children}
        </todocontext.Provider>
    );
};

export function useTodo() {
    const context = useContext(todocontext);
    if (!context) {
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
}


