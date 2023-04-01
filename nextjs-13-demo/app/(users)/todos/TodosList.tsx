import React from "react";
import Link from "next/link";
import { Todo } from "../../../typings";

// server component
const fetchTodos = async () => {
    // timeout for random number of seconds between 1 and 5
    // const timeout = Math.floor(Math.random() * 5 + 1) * 1000;
    // await new Promise((resolve) => setTimeout(resolve, timeout));

    const res = await fetch("https://jsonplaceholder.typicode.com/todos/"); // return an array of Todo objects
    const todos: Todo[] = await res.json();
    return todos;
}

// Server component, no need for State!
// any click handler or an event that needs binding would need a 'Client' component
async function TodosList() {
  const todos = await fetchTodos();

  return <>
    {todos.map((todo) => (
        <p key={todo.id}>
            <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
    ))}
  </>;
}

export default TodosList;
