import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Todo {
  id?: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const URL_API = "http://localhost:3000/todos";

function App() {
  console.log("App компонент відрендерився");

  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const handleAddTodo = () => {
    const newText = inputRef.current?.value;
    if (!newText) return;

    const newTodo: Todo = {
      text: newText,
      completed: false,
      createdAt: Date.now(),
    };

    fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Не вдалось створити задачу");
        return res.json();
      })
      .then((data) => {
        setTodos([...todos, data]);
      })
      .catch((error) => console.error("Помилка додавання нової замітки", error))
      .finally(() => {
        inputRef.current!.value = "";
        inputRef.current?.focus();
      });
  };

  useEffect(() => {
    fetch(URL_API)
      .then((res) => {
        if (!res.ok) throw new Error("Не вдалось завантажити данні");
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error("Помилка отримання задачі", error);
      });
  }, []);

  return (
    <>
      <h1 className="text-center text-[32px] text-red-300 font-bold">
        Todo List
      </h1>

      <div className="border-2 border-yellow-400 p-4">
        <Input type="text" placeholder="Що потрiбно зробити" ref={inputRef} />
        <Button
          variant="default"
          className="bg-red-400"
          onClick={handleAddTodo}
        >
          Добавить
        </Button>
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
