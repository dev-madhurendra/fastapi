import React from 'react';
import './style.css'
import styled from "styled-components"

export interface ITodo {
  title: string;
  body: string;
  createdAt: string;
  isCompleted: string;
  backgroundColor?: string;
  isShowIcons?: boolean
  onClick?:() => void
  onUpdateStatus?: () => void
  onDeleteTask?: () => void
}




const Todo: React.FC<ITodo> = ({ title, body, createdAt, isCompleted,backgroundColor,isShowIcons, onClick, onUpdateStatus, onDeleteTask }) => {
    const limitedTitle = title.length > 20 ? title.substring(0, 20) + '...' : title;
    const limitedBody = body.length > 100 ? body.substring(0, 100) + '...' : body;
  
    const StyledDiv = styled('div')({
        backgroundColor:!isCompleted ? backgroundColor : "white",
        backgroundImage: isCompleted ? 'url("https://clipart-library.com/images_k/check-mark-png-transparent/check-mark-png-transparent-9.png")' : 'none',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center'
    })
  return (
    <div onClick={onClick}>
        <StyledDiv className="container-main">
            <div className="header-container">
                <div>
                    <p>{createdAt}</p>
                </div>
                <div>
                    {isShowIcons && 
                        <div className="icons-header">
                           {!isCompleted &&  
                           <img
                                src="https://clipart-library.com/images_k/check-mark-png-transparent/check-mark-png-transparent-9.png"
                                alt="Update Status"
                                onClick={onUpdateStatus}
                            />}
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                                alt="Delete Task"
                                onClick={onDeleteTask}
                            />
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2541/2541991.png"
                                alt="Icon 3"
                            />
                        </ div>
                    }
                </div>
            </div>
            <hr width="30px" />
            <br />
            <div className="todo-container">
                <h2>{limitedTitle}</h2>
                <p><b>Description </b> : {limitedBody}</p>
                
            </div>
        </StyledDiv>
    </div>
  );
};

export default Todo;
