import React, {useState, useEffect} from "react";
import Todo from "../components/todo";


const TodoWrapper = () =>{
    const [isDarkMode, setIsDarkMode] = useState(false);  
    const [inputText, setInputText] = useState(""); 
    const [todos, setTodos]= useState([]);
    const [status, setStatus]=useState('all'); 
    const[filteredTodo, setFilteredTodo] = useState([]); 

    //toggle MODE
    
    const inputTextHandler = (e) => {
        //to get the value of whatever I type...
        setInputText(e.target.value);
    };
    const submitTodoHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos, { text: inputText, completed: false, id: Math.random() * 123 }
        ]);
        setInputText(""); 
    }
//USE EFFECT
    useEffect(() =>{
        getLocalTodo();
        }, []);//RENDER ONCE
          //Use effect
          useEffect(() =>{
            const filterHandler = () =>{
                switch(status){
                  case 'completed': 
                  setFilteredTodo(todos.filter(todo => todo.completed === true));
                  break;
                  case 'active':
                    setFilteredTodo(todos.filter(todo => todo.completed ===false));
                    break;
                    default:
                      setFilteredTodo(todos);
                      break;
            
                }
              };
              filterHandler();
            saveLocalTodo();
        
          }, [todos, status]); 
              
    const saveLocalTodo = () =>{
          localStorage.setItem('todos', JSON.stringify([]));
           };
    const getLocalTodo = () => {
            if(localStorage.getItem('todos') === null){
              localStorage.setItem('todos', JSON.stringify([]));
            } 
            else{
              let todoLocal= JSON.parse(localStorage.getItem("todos"));
              setTodos(todoLocal);
            }
            
           };
//ACTIVE STATES

    const statusHandler = (e) => {
        setStatus(e.target.value);
        };
//setStatus(e.target.value);
const clearCompleted =() =>{
    setTodos(todos.filter(todo => todo.completed ===false));
}
//TOGGLE THEME

const toggleHandler=()    =>{
if(isDarkMode===false){
    setIsDarkMode(!false);
}else{
    setIsDarkMode(false);
}
}

    return (

    <div className={`todo-wrapper ${isDarkMode ? "dark-theme": "light-theme"}`}>
        <div className = {`header-section ${isDarkMode ? "dark-header-section": ""}`} >
            <header >
                <h1> TO DO </h1>  
                <div className="toggle-container">
                <button onClick={toggleHandler}  className = {`toggle-btn toggle-light ${isDarkMode ? "toggle-light-visibility": ""}`}></button>
                <button onClick={toggleHandler}  className = {`toggle-btn toggle-dark ${isDarkMode ? "toggle-dark-visibility": ""}`} ></button>
                </div>
                
            </header>

            <form >
                <button onClick = { submitTodoHandler } className = "todo-btn" type = "submit" > </button>
                <input onChange = { inputTextHandler } type = "text" className = "todo-input" value = { inputText } placeholder = "Create a new todo..." / >
            </form> 
        </div>

        <div className="todo-container">
            <ul className="todo-list">
                {filteredTodo.map((todo) =>(
                <Todo key={todo.id} text={todo.text} todo={todo} todos={todos} setTodos={setTodos} filteredTodo = {filteredTodo}/>
                ))}
            </ul>
            <div className="todo-info"> <p className="todo-left">{filteredTodo.length} items left</p>
                    <button onClick={clearCompleted} className="todo-completed" type= "submit"> Clear Completed</button>
                </div>
        </div>
            <div className="states-container">
                <div className="states">
                    <span ><button onClick={statusHandler} className={`state-btn ${status === 'all'? "active": ""}`} value="all" type="submit">All</button></span>
                    <span><button onClick={statusHandler} className={`state-btn ${status === 'active'? "active": ""}`} value="active" type="submit">Active</button></span>
                    <span><button onClick={statusHandler} className={`state-btn ${status === 'completed'? "active": ""}`} value="completed" type="submit">Completed</button></span>
                </div>
            </div>    
    </div>
    );
}
export default TodoWrapper;