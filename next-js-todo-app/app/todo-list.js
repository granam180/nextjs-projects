import Todo from "./todo";

const getTodos = async () => {
  try {
    let todos = await fetch("http://localhost:3000/api/todo/list");
    // let todos = await fetch("/api/todo/list");
    return todos.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function TodoList() {
  const { todos } = await getTodos() || { todos: [] };

  return (
    <div style={{ fontSize: "1.5rem", textAlign: "end" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((t) => {
          return (
            <li key={t.id} style={{ padding: "10px 0" }}>
              {/* pass in todo as a prop */}
              <Todo todo={t} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
