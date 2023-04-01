"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function addTodo(name, refresh) {
  await fetch(`/api/todo/add`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  refresh();
}

export default function AddNewTodo() {
  const router = useRouter();
  let [name, setName] = useState("");
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        style={{ height: "30px", width: "200px" }}
      />
      <button
        onClick={async () => {
          await addTodo(name, router.refresh);
          setName(""); // clear input after adding todo
        }}
      >
        Add
      </button>
    </div>
  );
}
