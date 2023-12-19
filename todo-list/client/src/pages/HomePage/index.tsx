import React from 'react'
import TodoList from '../../organisms/TodoList'
import './style.css'
import Typography from "../../atoms/Typography"
const Home = () => {
    const [value,setValue] = React.useState('');
  return (
    <div className="container">
        <div className="header">
            <div>
                <h1>Todo App</h1>
            </div>

            <div class="searchBox">
                <input 
                    class="searchInput"
                    type="text" name="" 
                    placeholder="Search your todo..." 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>

        </div>
        <div className="todo-list">
            <TodoList searchValue={value} />
        </div>
    </div>
  )
}

export default Home