import {LoginType} from '../types'

const initState = {
    loading: false,
    data: '',
    email: '',
    password: '',
    message: '',
    error: false,
    user: '',
    status :''
}
export default function (state = initState, action: any) {
    switch (action.type) {
        case LoginType.REQUEST_LOGIN :
            return Object.assign({}, state, {
                loading: true,
                email: action.email,
                password: action.password,
            })
        case  LoginType.REQUEST_LOGIN_SUCCESS :
            return Object.assign({}, state, {
                loading: false,
                error: false,
                user: action.user,
                status : action.status
            })
        case LoginType.REQUEST_LOGIN_FAILED :
            return Object.assign({}, state, {
                loading: false,
                message: action.message,
                error: true,
                status : action.status
            })
        default :
            return state
    }
}