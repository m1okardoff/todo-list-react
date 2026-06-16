import { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

function App() {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storeTodos = localStorage.getItem("todos");

    return storeTodos ? JSON.parse(storeTodos) : [];
  });

  const [isSorted, setIsSorted] = useState<boolean>(false);

  const handleAddTodo = () => {
    const newText = text.trim();
    if (!newText) return;

    const newTodo: Todo = {
      id: self.crypto.randomUUID(),
      text: newText,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([...todos, newTodo]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <h1 className="text-center text-[32px] text-red-300 font-bold">
        Todo List - {text}
      </h1>

      <div className="border-2 border-yellow-400 p-4">
        <input
          className="p-2 grow w-100 mb-3"
          type="text"
          placeholder="Что нужно сделать?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          className="bg-blue-400 px-5 py-2 rounded-3xl me-3"
          onClick={handleAddTodo}
        >
          Добавить
        </button>
        <button className="bg-pink-300 px-5 py-2 rounded-3xl">
          Сортировать
        </button>
      </div>
      <div className="counter">
        Задач: <span>0</span>
      </div>
      <div className="todo-container">
        {todos.map((todo) => (
          <div key={todo.id}>{todo.text}</div>
        ))}
      </div>
    </>
  );
}

export default App;
