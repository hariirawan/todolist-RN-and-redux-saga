import Axios from './axios';

export const apiGetAllTodo = async () => {
  try {
    const todolist: any = await Axios.get('/todos?_limit=10');
    return todolist.data;
  } catch (error) {
    return console.error(error);
  }
};

export const apiGetDetailTodo = async ({payload}: any) => {
  try {
    const todolist: any = await Axios.get('/todos/' + payload.id);
    return todolist.data;
  } catch (error) {
    return console.error(error);
  }
};

export const apiUpdateDetailTodo = async (payload: any) => {
  try {
    const todolist: any = await Axios.put('/todos/' + payload.id);
    return todolist;
  } catch (error) {
    return console.error(error);
  }
};
