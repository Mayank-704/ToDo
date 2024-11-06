import { createContext, useContext } from "react";

export const ToDoContext = createContext({
    todos:[
/*todo*/  {
            id:1,
            todo:"ToDo msg",
            completed:false
        }
    ],
    addToDo:(todo)=>{},
    updatedToDo:(id,todo)=>{},
    deleteToDo:(id)=>{},
    toggleComplete:(id)=>{}
});

export const ToDoProvider = ToDoContext.Provider;

export const useToDo = () => {
  return useContext(ToDoContext);
};
