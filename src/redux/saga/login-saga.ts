import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {URL_INFO_USER, URL_LOGIN} from "../../config/api"
import HttpService from "../../service/HttpService"
import {InfoUserType, LoginType} from "../types";
import {saveHistory, setInfoUser} from "../../utils/AsyncStorage";

function* requestSignIn() {
    yield takeLatest(LoginType.REQUEST_LOGIN, function* (action: any) {
        try {
            const data = yield call(HttpService.request, 'POST', URL_LOGIN, {
                "use_email": action.email,
                "use_pwd": action.password,
            });
            const dataUser = yield call(HttpService.request, 'POST', URL_INFO_USER, {
                "use_session": data.session,
            });
            // if success save info user and put user info data to view
            let user = {...dataUser.profile, use_session: data.session}
            if (action.rememberMe) {
                yield call(setInfoUser, user)
            }
            yield put({
                type: InfoUserType.REQUEST_INFO_USER_SUCCESS,
                message: '',
                user: dataUser.profile,
            })
            yield put({
                type: LoginType.REQUEST_LOGIN_SUCCESS,
                message: '',
                user: dataUser.profile,
                status: 'LOGIN_SUCCESS'
            })

        } catch (e) {
            yield put({
                type: LoginType.REQUEST_LOGIN_FAILED,
                message: e.message,
                status: 'LOGIN_FAIL'
            })
        }
    })
}

function* getInfoUser() {
    yield takeLatest(InfoUserType.REQUEST_INFO_USER, function* (action: any) {
        try {
            const dataUser = yield call(HttpService.request, 'POST', URL_INFO_USER, {
                "use_session": action.token,
            });
            yield put({
                type: InfoUserType.REQUEST_INFO_USER_SUCCESS,
                message: '',
                user: dataUser.profile,
            })
        } catch (e) {
            yield put({
                type: InfoUserType.REQUEST_INFO_USER_FAILED,
                message: e.message,
            })
        }
    })
}

export default function* () {
    yield all([
        fork(requestSignIn),
        fork(getInfoUser),
    ])
}
