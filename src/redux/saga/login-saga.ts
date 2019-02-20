import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {URL_LOGIN} from "../../config/api"
import HttpService from "../../service/HttpService"
import {LoginType} from "../types";
import {saveHistory, setInfoUser} from "../../utils/AsyncStorage";

function* requestSignIn() {
    yield takeLatest(LoginType.REQUEST_LOGIN, function* (action: any) {
        try {
            const data = yield call(HttpService.request, 'POST', URL_LOGIN, {
                "use_email": action.email,
                "use_pwd": action.password,
            });
            // if success save info user and put user info data to view
            if (action.rememberMe) {
                yield call(setInfoUser, data)
            }
            yield put({
                type: LoginType.REQUEST_LOGIN_SUCCESS,
                message: '',
                user: data
            })

        } catch (e) {
            yield put({
                type: LoginType.REQUEST_LOGIN_FAILED,
                message: e.message
            })
        }
    })
}


export default function* () {
    yield all([
        fork(requestSignIn),
    ])
}
