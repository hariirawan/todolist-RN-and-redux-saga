import {
  FETCH_DETAIL_TODO_FAILURE,
  FETCH_DETAIL_TODO_REQUEST,
  FETCH_DETAIL_TODO_SUCCESS,
  ONCHANGE_DETAIL_TODO,
  SET_DETAIL_TODO,
} from '../../constants/types';

const initialState = {
  isLoading: false,
  data: {
    title: '',
    completed: false,
  },
};

export default function todoReducer(
  state = initialState,
  {type, payload}: any,
) {
  switch (type) {
    case FETCH_DETAIL_TODO_REQUEST:
      return {...state, isLoading: true};

    //ini kalo data dari api
    case FETCH_DETAIL_TODO_SUCCESS:
      return {...state, data: payload, isLoading: false};

    case FETCH_DETAIL_TODO_FAILURE:
      return {...state, isLoading: false};

    case SET_DETAIL_TODO:
      return {...state, data: payload};

    case ONCHANGE_DETAIL_TODO:
      return {
        ...state,
        data: payload,
      };

    default:
      return {...state};
  }
}
