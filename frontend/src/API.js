import axios from "axios";

export const getTodos = async () => {
  try {
    const response = await axios.get('http://localhost:4001/todos');
    console.log('response.data', response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (formData) => {
  try {
    const response = await axios.post('http://localhost:4001/todos', formData);
    console.log('response.data', response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4001/todos/${id}`);
    return response.data;
  }  catch (error) {
    console.error(error);
  }
};
