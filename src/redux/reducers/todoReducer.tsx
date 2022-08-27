import {
  ADD_TODOLIST,
  DELETE_TODOLIST,
  FETCH_ALLTODOLIST_FAILURE,
  FETCH_ALLTODOLIST_REQUEST,
  FETCH_ALLTODOLIST_SUCCESS,
  UPDATE_TODOLIST,
} from '../../constants/types';

const initialState = {
  isLoading: false,
  data: [],
};

export default function todoReducer(
  state = initialState,
  {type, payload}: any,
) {
  let todos: any = [],
    findIndex: number;

  switch (type) {
    case FETCH_ALLTODOLIST_REQUEST:
      return {...state, isLoading: true};

    case FETCH_ALLTODOLIST_SUCCESS:
      return {...state, data: payload.reverse(), isLoading: false};

    case FETCH_ALLTODOLIST_FAILURE:
      return {...state, isLoading: false};

    case ADD_TODOLIST:
      return {...state, data: [...state.data, payload].reverse()};

    case UPDATE_TODOLIST:
      todos = [...state.data];
      findIndex = todos.findIndex((val: any) => val.id === payload.id);
      if (findIndex > -1) {
        todos[findIndex]['title'] = payload.title;
        todos[findIndex]['completed'] = payload.completed;
      }
      return {...state, data: todos};

    case DELETE_TODOLIST:
      todos = [...state.data];
      findIndex = todos.findIndex((val: any) => val.id === payload.id);
      console.log(findIndex);
      if (findIndex > -1) {
        todos.splice(findIndex, 1);
      }
      return {...state, data: todos};
    default:
      return {...state};
  }
}
