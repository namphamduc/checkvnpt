import {LoginType} from '../types'

export function requestLogin(email: string, password: string, rememberMe: boolean) {
    return {
        type: LoginType.REQUEST_LOGIN,
        email,
        password, rememberMe
    }
}