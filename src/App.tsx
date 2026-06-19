import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemTodo } from "./components/ItemTodo";

export interface Todo {
    id?: string;
    text: string;
    completed: boolean;
    createdAt: number;
}

const URL_API = "http://localhost:3000/todos";

function App() {
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
            .catch((error) =>
                console.error("Помилка додавання нової замітки", error),
            )
            .finally(() => {
                inputRef.current!.value = "";
                inputRef.current?.focus();
            });
    };

    const handleDeleteTodo = (id: string) => {
        fetch(`${URL_API}/${id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error("Не вдалось видалити задачу");
                setTodos(
                    todos.filter((todo) => {
                        return todo.id !== id;
                    }),
                );
            })
            .catch((error) => console.error("Помилка:", error));
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
        <div className="max-w-[560px] w-full mx-auto my-10 p-6 bg-white border border-zinc-200  rounded-2xl shadow-xs flex flex-col gap-6">
            <h1 className="text-center text-3xl font-extrabold tracking-tight text-zinc-900">
                Todo List
            </h1>

            <div className="flex flex-col gap-3">
                <Input
                    type="text"
                    placeholder="Що потрібно зробити?"
                    ref={inputRef}
                />
                <div className="flex gap-2">
                    <Button
                        className="flex-1 font-bold"
                        variant="default"
                        onClick={handleAddTodo}
                    >
                        Додати
                    </Button>
                    <Button
                        className="font-semibold"
                        variant={isSorted ? "secondary" : "outline"}
                        onClick={() => setIsSorted(!isSorted)}
                    >
                        {isSorted ? "Скинути сортування" : "Сортувати (А-Я)"}
                    </Button>
                </div>
            </div>

            <div className="text-sm font-semibold text-zinc-500">
                Завдань: <span className="text-zinc-950">{todos.length}</span>{" "}
                &middot; Виконано: <span className="text-emerald-600 ">{}</span>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-1">
                {todos.map((todo) => (
                    <ItemTodo
                        item={todo}
                        key={todo.id}
                        toggleTodo={() => {}}
                        deleteTodo={() => handleDeleteTodo(todo.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
