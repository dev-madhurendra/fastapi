import React from 'react';
import Todo from '../../molecules/Todo';
import { lightColors, taskData, URL } from '../../utils/constants.ts';
import './style.css';
import {Box, Modal, Button} from '@mui/material';
import { getTodos, removeTodo, updateStatusTodo,addTodo } from '../../services/apicalls.ts'

interface ITodoList {
    searchValue: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    padding:'100px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const TodoList: React.FC = (props : ITodoList) => {
  const [todoData,setTodoData] = React.useState(taskData)
  const [clickedIndex, setClickedIndex] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [task, setTask] = React.useState('');
  const [description, setDescription] = React.useState('');


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
  
  const openAddTodo = () => setOpenAddTodoModal(!openAddTodoModal)

  const handleAddTask = async () => {
    if (task.trim() !== '' && description.trim() !== '') {
        
        try {
            const res = await addTodo(URL + "/todos/", { title: task, body: description });
      
            const updatedTodo = [...todoData,res.data]
            setTodoData(updatedTodo)
            alert("Task added successfully!");
            setTask('');
            setDescription('');
            handleClose();
          } catch (error) {
            console.error('Error adding task:', error);
            alert('Error adding task. Please try again.');
          }
        } else {
          alert('Please enter task and description.');
        }
  };

  return (
    <div className="todo-list-container">
      <div className="add-todo" onClick={handleOpen}>+</div>
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <h2>Add Task</h2>
                <br />
                <div>
                    <h3>Task</h3>
                    <input 
                        placeholder="Enter your task" 
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <h3>Description</h3>
                    <input 
                        placeholder="Enter your description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <br />
                <button onClick={handleAddTask}>
                    Add
                </button>
            </Box>
        </Modal>
      {props?.searchValue.length > 0 ? todoData.filter(todo => todo.title.toLowerCase().includes(props?.searchValue.toLowerCase())).map((todo, index) => (
        <Todo
          key={index}
          {...todo}
          backgroundColor={lightColors[index % lightColors.length]}
          onClick={() => handleClick(index)}
          onUpdateStatus={() => updateStatus(todo.id)}
          onDeleteTask={() => deleteTask(todo.id)}
          onUpdateTask = {() => updatedTask(todo.id)}
          isShowIcons={index === clickedIndex}
        />
      )) : 
      todoData.map((todo, index) => (
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
