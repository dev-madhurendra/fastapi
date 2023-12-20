import React, { useState, useEffect } from 'react';
import Todo from '../../molecules/Todo';
import { lightColors, taskData, URL } from '../../utils/constants.ts';
import './style.css';
import { Box, Modal, Button } from '@mui/material';
import { getTodos, removeTodo, updateStatusTodo, addTodo } from '../../services/apicalls.ts';

interface ITodoList {
  searchValue: string;
  id: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  padding: '100px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TodoList: React.FC = (props: ITodoList) => {
  const [todoData, setTodoData] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // Adjust as needed
  const [clickedIndex, setClickedIndex] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  useEffect(() => {
    if (props.id) {
      getTodos(URL + "/users/" + props.id).then((result) => {
        console.log(result.data);
        setTodoData(result.data.todo);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [props.id]);

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

  const openAddTodo = () => setOpenAddTodoModal(!openAddTodoModal);

  

  const handleAddTask = async () => {
    if (task.trim() !== '' && description.trim() !== '') {
      try {
        const res = await addTodo(URL + "/todos/user/" + props.id, { title: task, body: description });

        const updatedTodo = [...todoData, res.data];
        setTodoData(updatedTodo);
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

  const indexOfLastTodo = currentPage * perPage;
  const indexOfFirstTodo = indexOfLastTodo - perPage;
  const currentTodos = todoData.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
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
        {props?.searchValue.length > 0 ?
            currentTodos?.filter(todo => todo.title.toLowerCase().includes(props?.searchValue.toLowerCase()))?.map((todo, index) => (
            <Todo
                key={index}
                {...todo}
                backgroundColor={lightColors[index % lightColors.length]}
                onClick={() => handleClick(index)}
                onUpdateStatus={() => updateStatus(todo.id)}
                onDeleteTask={() => deleteTask(todo.id)}
                isShowIcons={index === clickedIndex}
            />
            )) :
            currentTodos?.map((todo, index) => (
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
        <div className="pagination-container">
            <ul className="pagination">
                {currentPage > 1 && <a
                    href={`#${currentPage > 1 ? currentPage - 1 : 1}`}
                    className="page-link"
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                >
                    {'<'}
                </a>}
                {new Array(Math.ceil(todoData.length / 5)).fill(0).map((_, index) => (
                <a
                    href={`#${index + 1}`}
                    key={index}
                    className={`page-link ${index + 1 === currentPage ? 'active' : ''}`}
                    onClick={() => paginate(index + 1)}
                >
                    {index + 1}
                </a>
                ))}
                {todoData.length / 5 > 4 && (
                    <span className="page-ellipsis">...</span>
                )}
                {currentPage < todoData.length / 5 && <a
                    href={`#${currentPage < todoData.length / 5 ? currentPage + 1 : todoData.length / 5}`}
                    className="page-link"
                    onClick={() =>
                        paginate(
                        currentPage < todoData.length / 5 ? currentPage + 1 : todoData.length / 5
                        )
                    }
                >
                    {'>'}
                </a>}
            </ul>
        </div>

    </div>
  );
};

export default TodoList;
