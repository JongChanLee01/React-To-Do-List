import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todos, onCheckToggle, onInsertToggle, onChangeSelectedTodo }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        // <TodoItem>{todo.text}</TodoItem>
        <TodoItem
          todo={todo}
          key={todo.id}
          onCheckToggle={onCheckToggle}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
        // List를 렌더링 할 때는 반드시 key값을 넣어주어야 함.
      ))}
    </div>
  );
};

export default TodoList;
