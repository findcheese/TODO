import React, { useState, useEffect} from "react";
import "./App.css";

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    // 초기화 시 localStorage에서 데이터 로드
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState(""); // 입력 필드 상태
  const [editId, setEditId] = useState(null); // 수정 중인 투두 ID
  const [editValue, setEditValue] = useState(""); // 수정 중인 값

  // todos 상태가 변경될 때 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 새로운 투두 추가
  const addTodo = () => {
    if (inputValue.trim() === "") return; // 빈 값 방지
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue(""); // 입력 필드 초기화
  };

  // 투두 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 완료 상태 토글
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // 수정
  const startEditing = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const saveEdit = () => {
      if (editValue.trim() === "") return; // 빈 값 방지
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editValue } : todo
      ));
    clearEditing();
  };

  const clearEditing = () => {
    setEditId(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="container">
      <h1 className="title">📝 Have To Do</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="기록하자"
          className="input"
      />
      <button onClick={addTodo} className="add-button">
        Add
      </button>
    </div>
    <ul className="list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="checkbox"
          />
          {editId === todo.id ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="edit-input"
            />
          ) : (
            <span
              className={`todo-text ${todo.completed ? "completed" : ""}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
          )}
          {editId === todo.id ? (
            <>
              <button onClick={saveEdit} className="save-button">
                Save
              </button>
              <button onClick={cancelEdit} className="cancel-button">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => startEditing(todo.id, todo.text)} className="edit-button">
              ✏️
            </button>
         )}
         <button onClick={() => deleteTodo(todo.id)} className="delete-button">
           🗑️
         </button>
       </li>
     ))}
    </ul>
  </div>

  );
}


export default TodoApp;

