const list = document.getElementById("todoList");
const input = document.getElementById("todoInput");

// Load todos
async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();

  list.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.text}
      <button onclick="deleteTodo(${todo.id})">❌</button>
    `;
    list.appendChild(li);
  });
}

// Add todo
async function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadTodos();
}

// Delete todo
async function deleteTodo(id) {
  await fetch(`/todos/${id}`, { method: "DELETE" });
  loadTodos();
}

// Initial load
loadTodos();
