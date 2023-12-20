import React from 'react'
import TodoList from '../../organisms/TodoList'
import './style.css'
import Sidebar from "../../organisms/Sidebar"
import Typography from "../../atoms/Typography"
import {URL} from "../../utils/constants.ts"
import {getUser} from "../../services/apicalls.ts"

const DashboardPage = () => {
    const [value,setValue] = React.useState('');
    const token = localStorage.getItem("token") 
    const userId = localStorage.getItem("user_id") 
    const [name,setName] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [id,setId] = React.useState('')
    React.useEffect(() => {
        getUser(URL + "/users/" + userId).then((result) => {
            console.log(result.data)
            setName(result.data.name)
            setEmail(result.data.email)
            setId(result.data.id)
        }).catch((err) => {
            console.log(error)
        });
    },[])
  return (
    <div className="container">
        <div>
            <Sidebar name={name} email={email} />
        </div>
        <div>
            <div className="header">
                <div>
                    <h1>To-do App</h1>
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
                <TodoList searchValue={value} id={id} />
            </div>
        </div>
    </div>
  )
}

export default DashboardPage