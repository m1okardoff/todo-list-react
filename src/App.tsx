import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemTodo } from "./components/ItemTodo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface TodoDTO {
  id?: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const URL_API = "http://localhost:3000/todos";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get<TodoDTO[]>(URL_API);
      return response.data;
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await axios.post<TodoDTO>(URL_API, {
        text: text,
        complited: false,
        createAt: Date.now(),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const handleAddTodo = () => {
    const newText = inputRef.current?.value;
    if (!newText) return;

    addTodoMutation.mutate(newText, {
      onSuccess: () => {
        if (inputRef.current) {
          inputRef.current!.value = "";
          inputRef.current?.focus();
        }
      },
    });
  };

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete<TodoDTO>(`${URL_API}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const handleToggleTodo = (id: string, currentCompleted: boolean) => {
    //   fetch(`${URL_API}/${id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({completed: !currentCompleted}),
    //     })
    //         .then((res) => {
    //             if (!res.ok) throw new Error("Не вдалось змінити статус");
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setTodos(todos.map((todo) => {
    //               return todo.id === id ? data : todo
    //             }));
    //         })
    //         .catch((error) =>
    //             console.error("Помилка", error),
    //         )
  };

  return (
    <div className="max-w-[560px] w-full mx-auto my-10 p-6 bg-white border border-zinc-200  rounded-2xl shadow-xs flex flex-col gap-6">
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-zinc-900">
        Todo List
      </h1>

      <div className="flex flex-col gap-3">
        <Input type="text" placeholder="Що потрібно зробити?" ref={inputRef} />
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
        Завдань: <span className="text-zinc-950">{todos.length}</span> &middot;
        Виконано: <span className="text-emerald-600 ">{}</span>
      </div>

      <div className="flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-1">
        {todos.map((todo) => (
          <ItemTodo
            item={todo}
            key={todo.id}
            toggleTodo={() => handleToggleTodo(todo.id!, todo.completed)}
            deleteTodo={() => handleDeleteTodo(todo.id!)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
