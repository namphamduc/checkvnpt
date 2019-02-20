import {HistoryType} from "../types";

const initState = {
    loading: false,
    data: '',
    message: '',
    error: false
}
export default function (state = initState, action: any) {
    switch (action.type) {
        case HistoryType.REQUEST_HISTORY :
            return Object.assign({}, state, {
                loading: true
            })
        case  HistoryType.REQUEST_HISTORY_SUCCESS :
            return Object.assign({}, state, {
                loading: false,
                data: action.data,
                message: action.message,
            })
        case HistoryType.REQUEST_HISTORY_FAILED :
            return Object.assign({}, state, {
                loading: false,
                data: action.data,
                message: action.message
            })
        default :
            return state
    }
}