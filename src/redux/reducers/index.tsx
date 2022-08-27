import {combineReducers} from '@reduxjs/toolkit';
import todoReducer from './todoReducer';
import todoDetailReducer from './todoDetailReducer';

export default combineReducers({
  todoReducer,
  todoDetail: todoDetailReducer,
});
