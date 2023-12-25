import React from 'react';
import AddTodo from "@/components/AddTodo";
import Todos from "@/components/Todos";
import Navbar from "@/components/Navbar";

const Page = () => {
    return (
        <main>
            <h2>Todo-App</h2>
            <Navbar/>
            <AddTodo/>
            <Todos/>
        </main>
    );
};

export default Page;