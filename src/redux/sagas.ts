import {all} from 'redux-saga/effects';
import login from './saga/login-saga'
import getHistory from "./saga/history-saga";
import scanqr from './saga/scanqr-saga'

export default function* rootSaga() {
    yield all([login(), scanqr(), getHistory(),])
}

