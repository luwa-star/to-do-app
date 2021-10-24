import React from "react";

const Header = () => {
    return (

        <div className = "header-section">
        <header >
        <h1> TO DO</h1> 
        <button className = "toggle-btn"> </button>
        </header>

        <form>
        <button className = "todo-btn" type = "submit"> </button> 
        <input type = "text"className = "todo-input" />
        </form> 
        </div>

    );
}
export default Header;