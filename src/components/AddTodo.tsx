"use client";
import React, {FormEvent} from 'react';
import {useTodo} from "@/store/todos";

const AddTodo = () => {
    const [todo, setTodo] = React.useState<string>("");

    // @ts-ignore
    const {handleAddTodo} = useTodo();

    return (
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleAddTodo(todo);
            setTodo("");

        }}
        >
            <input type="text" placeholder="write your todo" name="" id="" value={todo} onChange={(event) => {
                setTodo(
                    event.target.value
                );
            }}/>
            <button type="submit">ADD</button>

        </form>
    );
};

export default AddTodo;