import { useContext } from "react";
import TodoItem from "./TodoItem";
import TodoContext from "../context/TodoContext";

function TodoList() {
  const { todoItem } = useContext(TodoContext);

  if (!todoItem || todoItem.length === 0) {
    return <p className="message">! No Todo Yet</p>;
  }

  return (
    <div className="todo-list">
      {todoItem.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          isCompleted={item.isCompleted}
        />
      ))}
    </div>
  );
}

export default TodoList;
