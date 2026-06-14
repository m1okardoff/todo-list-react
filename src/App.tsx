
function App() {

  return (
    <>
      <h1>Todo List</h1>

      <div className="controls">
        <input type="text" id="todo-input" placeholder="Что нужно сделать?" />
        <button id="add-button">Добавить</button>
        <button id="sort-button">Сортировать</button>
      </div>
      <div className="counter">
        Задач: <span id="todo-count">0</span>
      </div>
      <div id="todo-list" className="todo-container"></div>
    </>
  );
}

export default App
