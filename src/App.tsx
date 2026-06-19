import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

function App() {
  console.log("App компонент відрендерився");

  const [todos, setTodos] = useState<Todo[]>(() => {
    const storeTodos = localStorage.getItem("todos");

    return storeTodos ? JSON.parse(storeTodos) : [];
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [isSorted, setIsSorted] = useState<boolean>(false);

  const handleAddTodo = () => {
    const newText = inputRef.current.value;
    if (!newText) return;

    const newTodo: Todo = {
      id: self.crypto.randomUUID(),
      text: newText,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([...todos, newTodo]);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    inputRef.current.focus();
  }, [todos]);

  return (
    <>
      <h1 className="text-center text-[32px] text-red-300 font-bold">
        Todo List
      </h1>

      <div className="border-2 border-yellow-400 p-4">
        {/* <input
          className="p-2 grow w-100 mb-3"
          type="text"
          placeholder="Что нужно сделать?"
          ref={inputRef}
        /> */}
        {/* <button
          className="bg-blue-400 px-5 py-2 rounded-3xl me-3"
          onClick={handleAddTodo}
        >
        
          Добавить
        </button> */}
        <Input type="text" placeholder="Що потрiбно зробити" ref={inputRef}/>
        <Button variant="default" className="bg-red-400">Добавить</Button>
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
