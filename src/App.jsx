import { useEffect, useState } from "react";
import "./App.css";
import { ToDoProvider } from "./Context/index";
import ToDoForm from "./Components/ToDoForm/ToDoForm";
import ToDoItem from "./Components/ToDoItem/ToDoItem";
function App() {
  const [todos, settodos] = useState([]);

  const addToDo = (todo) => {
    settodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updatedToDo = (id, todo) => {
    settodos((prev) =>
      prev.map((prevTodo) => {
        prevTodo.id === id ? todo : prevTodo;
      })
    );
  };

  const deleteToDo = (id) => {
    settodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    //console.log(id);
    settodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <ToDoProvider
        value={{ todos, addToDo, updatedToDo, deleteToDo, toggleComplete }}
      >
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">
              {/* Todo form goes here */}
              <ToDoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <ToDoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ToDoProvider>
    </>
  );
}

export default App;
