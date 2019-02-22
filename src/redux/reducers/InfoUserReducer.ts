import {InfoUserType} from "../types";

const initState = {
    token: '',
    loading: false,
    error: false,
    user: '',
}
export default function (state = initState, action: any) {
    switch (action.type) {
        case InfoUserType.REQUEST_INFO_USER :
            return Object.assign({}, state, {
                loading: true,
                token :action.token
            })
        case  InfoUserType.REQUEST_INFO_USER_SUCCESS :
            return Object.assign({}, state, {
                loading: false,
                error: false,
                user: action.user,
            })
        case InfoUserType.REQUEST_INFO_USER_FAILED :
            return Object.assign({}, state, {
                loading: false,
                message: action.message,
                error: true,
            })
        default :
            return state
    }
}