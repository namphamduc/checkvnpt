import {GetInfoItemType} from '../types'

const initState = {
    data: '',
    code: '',
    message: '',
    loading: false,
    resultType: ''
}
export default function (state = initState, action: any) {
    switch (action.type) {
        case GetInfoItemType.REQUEST_INFO_ITEM :
            return Object.assign({}, state, {
                loading: true,
                resultType: '',
                code: action.code
            })
        case  GetInfoItemType.REQUEST_INFO_ITEM_SUCCESS :
            return Object.assign({}, state, {
                loading: false,
                resultType: "Success",
                data: action.data,
                code: action.code
            })
        case GetInfoItemType.REQUEST_INFO_ITEM_FAILED :
            return Object.assign({}, state, {
                loading: false,
                resultType: "Failure",
                message: action.message,
                data:''
            })
        default :
            return state
    }
}