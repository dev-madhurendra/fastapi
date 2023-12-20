import axios from "axios"

export const getTodos = (url) => {
    const res = axios.get(url);
    return res;
}

export const removeTodo = (url) => {
    const res = axios.delete(url);
    return res;
}

export const updateStatusTodo = (url, data) => {
    const res = axios.put(url, data);
    return res;
}

export const addTodo = (url,data) => axios.post(url,data)