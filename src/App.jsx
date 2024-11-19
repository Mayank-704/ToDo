import { useEffect, useState } from "react";
import weatherImage from "./assets/Cloud-Linear-32px.svg";
import "./App.css";
import { ToDoProvider } from "./Context/index";
import ToDoForm from "./Components/ToDoForm/ToDoForm";
import ToDoItem from "./Components/ToDoItem/ToDoItem";
import Weather from "./Components/Weather";

function App() {
  const [todos, settodos] = useState([]);
  const [weather, setWeather] = useState(false);

  const addToDo = (todo) => {
    settodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updatedToDo = (id, todo) => {
    settodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      )
    );
  };

  const deleteToDo = (id) => {
    settodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
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
      {weather && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96 relative">
      <button
        onClick={() => setWeather(false)}
        className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 transition"
        aria-label="Close"
      >
        ✕
      </button>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Weather</h2>
      <p className="text-gray-600 mb-4">
        {/* It's a sunny day with a high of 25°C and a low of 18°C. Perfect for outdoor activities! */}
        <Weather/>
      </p>
    </div>
  </div>
)}

      <ToDoProvider
        value={{ todos, addToDo, updatedToDo, deleteToDo, toggleComplete }}
      >
        <div className={`bg-[#172842] min-h-screen py-8 ${weather ? "blur-sm" : ""}`}>
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-4xl font-bold text-center mt-2">
              Manage Your Todos
            </h1>
            <h1
              onClick={() => setWeather((prev) => !prev)}
              className="text-lg text-[#FF8A65] cursor-pointer flex justify-end gap-2 mt-2 font-semibold text-right mb-6 transition-transform duration-300 hover:scale-125"
            >
              See  Weather
              <img src={weatherImage} alt="weather" className="" />
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
