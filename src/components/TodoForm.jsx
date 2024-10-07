import { useContext, useEffect, useState } from "react";
import not_tick from "../assets/not_tick.png";
import Card from "../shared/Card";
import TodoContext from "../context/TodoContext";

function TodoForm() {
  const [text, setText] = useState("");

  const {addTodo, todoEdit, updateTodo} = useContext(TodoContext)

  useEffect(() => {
    if(todoEdit.edit === true) {
      setText(todoEdit.item.text);
    }
  }, [todoEdit])

  const handleTextChange = (e) => {
    let inputValue = e.target.value;
    setText(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text === ''){
        return null
    } 
    
    const newTodoItem = {
        text: text,
        isCompleted: false
    }

    if(todoEdit.edit === true) {
      updateTodo(todoEdit.item.id, todoEdit.item.isCompleted, newTodoItem)
    } else {
      addTodo(newTodoItem);      
    }

    setText('');
  };

  return (
    <Card>
      <div className="done-display">
        <img src={not_tick} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleTextChange}
          type="text"
          placeholder="Add a task"
          value={text}
        />
      </form>
    </Card>
  );
}

export default TodoForm;
