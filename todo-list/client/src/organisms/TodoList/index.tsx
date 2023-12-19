import React from 'react';
import Todo from '../../molecules/Todo';
import { lightColors, taskData, URL } from '../../utils/constants.ts';
import './style.css';
import { getTodos, removeTodo, updateStatusTodo } from '../../services/apicalls.ts'

const TodoList: React.FC = () => {
  const [todoData,setTodoData] = React.useState(taskData)
  const [clickedIndex, setClickedIndex] = React.useState(null);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  React.useEffect(() => {
    getTodos(URL+"/todos").then((result) => {
        setTodoData(result.data)
    }).catch((err) => {
        console.log(err); 
    });
  }, [])
  
  const updateStatus = async (id) => {
    try {
      const res = await getTodos(URL + "/todos/" + id);
  
      const updatedData = {
        title: res.data.title,
        body: res.data.body,
        isCompleted: !res.data.isCompleted,
      };
  
      await updateStatusTodo(URL + "/todos/" + id, updatedData);
  
      const updatedTodoData = todoData.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
  
      setTodoData(updatedTodoData);
  
      console.log("Todo status updated successfully");
    } catch (err) {
      console.log(err);
    }
  };
  
  const deleteTask = async (id) => {
    try {
      await removeTodo(URL + "/todos/" + id);
      const updatedTodoData = todoData.filter((todo) => todo.id !== id);
      setTodoData(updatedTodoData);
      alert("Task deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="todo-list-container">
      <div className="add-todo">+</div>
      {todoData.map((todo, index) => (
        <Todo
          key={index}
          {...todo}
          backgroundColor={lightColors[index % lightColors.length]}
          onClick={() => handleClick(index)}
          onUpdateStatus={() => updateStatus(todo.id)}
          onDeleteTask={() => deleteTask(todo.id)}
          isShowIcons={index === clickedIndex}
        />
      ))}
    </div>
  );
};

export default TodoList;
