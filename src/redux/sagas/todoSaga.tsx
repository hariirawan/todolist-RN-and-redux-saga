import {call, put, takeEvery} from 'redux-saga/effects';
import {
  FETCH_ALLTODOLIST_FAILURE,
  FETCH_ALLTODOLIST_REQUEST,
  FETCH_ALLTODOLIST_SUCCESS,
  FETCH_DETAIL_TODO_FAILURE,
  FETCH_DETAIL_TODO_REQUEST,
  FETCH_DETAIL_TODO_SUCCESS,
} from '../../constants/types';
import {TodoListType, TodoType} from '../../types/todoType';
import {apiGetAllTodo, apiGetDetailTodo} from '../api/todolistApi';

function* getTodolist() {
  try {
    const todolist: TodoListType = yield call(apiGetAllTodo);
    yield put({type: FETCH_ALLTODOLIST_SUCCESS, payload: todolist});
  } catch (error) {
    yield put({type: FETCH_ALLTODOLIST_FAILURE, payload: error});
  }
}

function* getDetails(payload: any) {
  try {
    const todo: TodoType = yield call(apiGetDetailTodo, payload);
    yield put({
      type: FETCH_DETAIL_TODO_SUCCESS,
      payload: todo,
    });
  } catch (err) {
    yield put({type: FETCH_DETAIL_TODO_FAILURE, payload: err});
  }
}

export default function* todoSaga() {
  yield takeEvery(FETCH_ALLTODOLIST_REQUEST, getTodolist);
  yield takeEvery(FETCH_DETAIL_TODO_REQUEST, getDetails);
}
