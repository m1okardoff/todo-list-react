
function App() {

  return (
    <>
      <h1 className="text-center text-[32px] text-red-300 font-bold">Todo List</h1>

      <div className="border-2 border-yellow-400 p-4">
        <input className="p-2 grow w-100 mb-3" type="text" placeholder="Что нужно сделать?" />
        <button className="bg-blue-400 px-5 py-2 rounded-3xl me-3">Добавить</button>
        <button className="bg-pink-300 px-5 py-2 rounded-3xl">Сортировать</button>
      </div>
      <div className="counter">
        Задач: <span>0</span>
      </div>
      <div className="todo-container"></div>
    </>
  );
}

export default App
