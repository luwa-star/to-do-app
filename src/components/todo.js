import React from "react";

const Todo = ({text,todo, todos, setTodos}) => {
    const deleteHandler = ()=>{
setTodos(todos.filter((el) => el.id !== todo.id));
    }
    const completeHandler =() =>{
    setTodos(todos.map((item) =>{
    if (item.id=== todo.id) {
        return{
            ...item, completed: !item.completed
        }      
    }
    return item;   
})
        );
    }
    
    return ( 
            <div className="todo">
                <button onClick={completeHandler} className = {`todo-btn complete-btn ${todo.completed ? "checked" :'' }`} type = "submit"> </button>
                <li className={`todo-item ${todo.completed ? "completed" : ''}`}>{text}</li>
                <button onClick={deleteHandler} className = "btn-delete" type = "submit"></button>
            </div>
    );
}





export default Todo;