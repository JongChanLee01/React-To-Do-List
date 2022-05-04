import React, { useState } from "react";
import Template from "./components/Template";
import TodoList from "./components/TodoList";
import TodoInsert from "./components/TodoInsert";
import "./App.css";
import { MdAddCircle } from "react-icons/md";

//리렌더링 할 때 마다 계속 4로 돌아가기 때문에 바깥으로 두어서 값이 증가가 될 수 있도록 함.
let nextId = 4;

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할일 1",
      checked: true,
    },
    {
      id: 2,
      text: "할일 2",
      checked: false,
    },
    {
      id: 3,
      text: "할일 3",
      checked: true,
    },
  ]);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }

    //이전 값의 Boolean 값을 반대로 바꿔주는 함수를 리턴하도록 함
    setInsertToggle((prev) => !prev);
  };

  const onInsertTodo = (text) => {
    if (text === "") {
      return alert("할 일을 입력해주세요!");
    } else {
      const todo = {
        id: nextId,
        text,
        checked: false,
      };

      //변경 되기 전의 값을 기억하고 있어야 하므로 concat함수를 이용함
      //concat함수 -> push함수를 사용하면 해당 배열 자체가 변경되고
      // concat 함수를 사용하면 새 배열이 리턴이 되고 기존 배열은 변경이 되지 않는다.
      //쉽게 말해서 a라는 배열에 1 2 3 4를 저장한 배열이 있다면 새로 push를 하였을때 새로운 값이 들어가지만
      //실질적으로 a라는 배열은 1 2 3 4값을 그대로 가지고 있고, 그냥 새로운 값이 추가적으로 '따로' 들어가는것임
      setTodos((todos) => todos.concat(todo));
      nextId++;
    }
  };

  const onCheckToggle = (id) => {
    //todo가 가지고 있는 객체 속성을 모두 가져오고 checked의 값을 반대로 바꿔줌.
    //만약 같지 않다면 todo를 반환해줌.
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const onRemove = (id) => {
    onInsertToggle();
    //todo에 id가 인자로 받아온 id와 일치하지 않는 것만 리턴 하도록 함
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    // ...todo ->spread연산자로 todo 객체의 모든 속성을 다 풀어줌
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <Template todoLength={todos.length}>
      <TodoList
        todos={todos}
        onCheckToggle={onCheckToggle}
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
      />
      <div className="add-todo-button" onClick={onInsertToggle}>
        <MdAddCircle />
      </div>
      {insertToggle && (
        <TodoInsert
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onInsertTodo={onInsertTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      )}
    </Template>
  );
};

export default App;
