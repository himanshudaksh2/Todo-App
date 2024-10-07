import { createContext, useEffect, useState } from "react";
import TodoData from "../data/TodoData";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoItem, setTodoItem] = useState([]);

  const [todoEdit, setTodoEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchTodoItem();
  }, []);

  // Fetch Data From Backend
  const fetchTodoItem = async () => {
    const response = await fetch(
      "http://localhost:5000/todoItem?_sort=id&_order=desc"
    );
    const data = await response.json();

    setTodoItem(data);
  };

  //Add Todo Item
  const addTodo = async (newTodoItem) => {
    const response = await fetch("http://localhost:5000/todoItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodoItem),
    });

    const data = await response.json()

    setTodoItem([data, ...todoItem]);
  };

  //Delete TodoItem
  const deleteTodoItem = async (id) => {
    if (window.confirm("Are You Sure?")) {
      await fetch(`http://localhost:5000/todoItem/${id}`, {
        method: "DELETE",
      });

      setTodoItem(todoItem.filter((item) => item.id !== id));
    }
  };

  //Toggle Completed Task
  const toggleTask = async (id, item) => {
    const response = await fetch(`http://localhost:5000/todoItem/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, isCompleted: !item.isCompleted }),
    });

    const data = await response.json();
    console.log(data);

    setTodoItem(todoItem.map((todo) => (todo.id === id ? data : todo)));
  };

  //Set Item To TodoForm
  const editTodo = (item) => {
    setTodoEdit({
      item,
      edit: true,
    });
  };

  //Update Todo
  const updateTodo = async (id, isCompleted, updtItem) => {
    const response = await fetch(`http://localhost:5000/todoItem/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...updtItem, isCompleted}),
    });

    setTodoItem(
      todoItem.map((item) =>
        item.id === id ? { ...item, ...updtItem, isCompleted } : item
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todoItem,
        todoEdit,
        addTodo,
        deleteTodoItem,
        toggleTask,
        editTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
