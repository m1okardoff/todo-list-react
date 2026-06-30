import type { TodoDTO } from "@/App";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface ItemTodoProps {
  item: TodoDTO;
  toggleTodo: () => void;
  deleteTodo: () => void;
}

export const ItemTodo = ({ item, toggleTodo, deleteTodo }: ItemTodoProps) => {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-zinc-50 border border-zinc-100 rounded-xl shadow-2xs hover:bg-zinc-100/50  transition-all duration-200">
      <Checkbox checked={item.completed} onCheckedChange={toggleTodo} />
      <span
        className={`grow text-sm font-medium transition-all duration-300 select-none ${
          item.completed ? "line-through text-zinc-400" : "text-zinc-850"
        }`}
      >
        {item.text}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-500 hover:text-red-600 hover:bg-red-50 py-1.5 h-8 font-semibold cursor-pointer"
        onClick={deleteTodo}
      >
        Видалити
      </Button>
    </div>
  );
};
