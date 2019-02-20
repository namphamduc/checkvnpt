import {GetInfoItemType} from '../types'

const initState = {
    data: '',
    code: '',
    message: ''
}
export default function (state = initState, action: any) {
    switch (action.type) {
        case GetInfoItemType.REQUEST_INFO_ITEM :
            return Object.assign({}, state, {
                code: action.code
            })
        case  GetInfoItemType.REQUEST_INFO_ITEM_SUCCESS :
            return Object.assign({}, state, {
                data: action.data,
            })
        case GetInfoItemType.REQUEST_INFO_ITEM_FAILED :
            return Object.assign({}, state, {
                message: action.message
            })
        default :
            return state
    }
}