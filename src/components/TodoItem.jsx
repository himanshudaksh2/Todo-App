import { FaTrash, FaEdit } from "react-icons/fa";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import Card from "../shared/Card";
import { useContext } from "react";
import TodoContext from "../context/TodoContext";

function TodoItem({ item, isCompleted }) {
  const {deleteTodoItem, toggleTask, editTodo} = useContext(TodoContext)

  return (
    <Card>
      <div className="done-display" onClick={() => toggleTask(item.id, item)}>
        <img src={isCompleted ? tick : not_tick} alt="" />
      </div>
      <div
        className={`text-display ${isCompleted && "line-through"}`}
        onClick={() => toggleTask(item.id, item)}
      >
        {item.text}
      </div>
      <button onClick={() => editTodo(item)} className="edit">
        <FaEdit size={22} color="grey"/>
      </button>
      <button onClick={() => deleteTodoItem(item.id)} className="close">
        <FaTrash size={20} color="grey" />
      </button>
    </Card>
  );
}

export default TodoItem;
