import React, { useState, useEffect} from "react";

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    // 초기화 시 localStorage에서 데이터 로드
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState(""); // 입력 필드 상태

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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Have To Do</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="기록하자"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={styles.checkbox}
            />
            <span
              style={{
                ...styles.todoText,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "#5f4b32",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    backgroundColor: "#f8f4c4", // 메모지 배경색
    border: "2px solid #f0e68c", // 테두리 색상
    borderRadius: "15px",
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
    padding: "20px",
  },
  title: {
    color: "#5f4b32",
    fontSize: "24px",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "70%",
    marginRight: "10px",
    border: "1px solid #d2b48c",
    borderRadius: "5px",
    backgroundColor: "#fffacd", // 연한 노란색
    outline: "none",
  },
  addButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#ffd700", // 메모지 노란색
    color: "#5f4b32",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  todoItem: {
    backgroundColor: "#fffacd", // 연한 노란색
    color: "#5f4b32",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px dashed #d2b48c",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  todoText: {
    cursor: "pointer",
    fontSize: "16px",
    flexGrow: 1,
    textAlign: "left",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#ff6347",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};


export default TodoApp;

