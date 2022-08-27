import {spawn} from '@redux-saga/core/effects';

import todoSaga from './todoSaga';

export default function* rootSaga() {
  yield spawn(todoSaga);
}
