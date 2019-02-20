import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {URL_LOGIN} from "../../config/api"
import HttpService from "../../service/HttpService"
import {HistoryType} from "../types";
import {getAllHistory} from "../../utils/AsyncStorage";

function* getHistory() {
    yield takeLatest(HistoryType.REQUEST_HISTORY, function* (action: any) {
        try {
            const data = yield call(getAllHistory);
            console.log("getHistory  "+ JSON.stringify(data))
            // if success save info user and put user info data to view
            yield put({
                type: HistoryType.REQUEST_HISTORY_SUCCESS,
                message: '',
                data: data
            })
        } catch (e) {
            yield put({
                type: HistoryType.REQUEST_HISTORY_FAILED,
                message: e.message
            })
        }
    })
}


export default function* () {
    yield all([
        fork(getHistory),
    ])
}
