import React from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Header />
      <div className="container">
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
