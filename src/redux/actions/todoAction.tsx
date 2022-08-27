import {
  ADD_TODOLIST,
  DELETE_TODOLIST,
  FETCH_ALLTODOLIST_REQUEST,
  FETCH_DETAIL_TODO_REQUEST,
  ONCHANGE_DETAIL_TODO,
  SET_DETAIL_TODO,
  UPDATE_TODOLIST,
} from '../../constants/types';

export function fetchAllTodo(data: any) {
  return {
    type: FETCH_ALLTODOLIST_REQUEST,
    payload: data,
  };
}

export function fetchDetailTodo(data: any) {
  return {
    type: FETCH_DETAIL_TODO_REQUEST,
    payload: data,
  };
}

export function onChangeTodo(data: any) {
  return {
    type: ONCHANGE_DETAIL_TODO,
    payload: data,
  };
}

export function setDetailTodo(data: any) {
  return {
    type: SET_DETAIL_TODO,
    payload: data,
  };
}

export function updateTodo(data: any) {
  return {
    type: UPDATE_TODOLIST,
    payload: data,
  };
}

export function deleteTodo(data: any) {
  return {
    type: DELETE_TODOLIST,
    payload: data,
  };
}

export function addTodo(data: any) {
  return {
    type: ADD_TODOLIST,
    payload: data,
  };
}
