import React from 'react'
import TodoList from '../../organisms/TodoList'
import './style.css'
import Typography from "../../atoms/Typography"
const Home = () => {
  return (
    <div className="container">
        <div className="header">
            <div>
                <h1>Todo App</h1>
            </div>

            <div class="searchBox">
                <input class="searchInput"type="text" name="" placeholder="Search your todo..." />
            </div>

        </div>
        <div className="todo-list">
            <TodoList />
        </div>
    </div>
  )
}

export default Home