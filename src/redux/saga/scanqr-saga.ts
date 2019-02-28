import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {API_GET_COMPANY_BY_CODE, API_GET_ITEM_BY_CODE} from "../../config/api"
import HttpService from "../../service/HttpService"
import {GetInfoItemType} from "../types";
import {getCurrentDateTime} from "../../utils/TimeUtils";
import {saveHistory} from "../../utils/AsyncStorage";

function* requestInfoItem() {
    yield takeLatest(GetInfoItemType.REQUEST_INFO_ITEM, function* (action: any) {
            try {
                let urlgetItem = API_GET_ITEM_BY_CODE;
                let urlgetCompany = API_GET_COMPANY_BY_CODE;
                console.log('xxxxx '+ urlgetItem)
                if (action.code) {
                    urlgetItem = urlgetItem.concat(action.code)
                    urlgetCompany = urlgetCompany.concat(action.code)
                } else {
                    yield put({
                        type: GetInfoItemType.REQUEST_INFO_ITEM_FAILED,
                        message: 'CODE_NULL'
                    })
                }
                const [infoItem, infoCompany] = yield all([
                    call(HttpService.request, 'GET', urlgetItem),
                    call(HttpService.request, 'GET', urlgetCompany)])

                // if success save info user and put user info data to view
                let historyItem = {
                    pro_name: infoItem.item.pro_name,
                    ite_status: infoItem.item.ite_status,
                    company_infor: infoCompany.company,
                    username: 'NA',
                    code: action.code,
                    time: getCurrentDateTime()
                } as any
                yield put({
                    type: GetInfoItemType.REQUEST_INFO_ITEM_SUCCESS,
                    data: historyItem
                })
                console.log('------------historyItem  ' + JSON.stringify(historyItem))
                yield call(saveHistory, historyItem)
                // yield call(database.addHistoryItem, data.item, action.code)
            } catch (e) {
                yield put({
                    type: GetInfoItemType.REQUEST_INFO_ITEM_FAILED,
                    message: e.message
                })
            }
        }
    )
}


export default function* () {
    yield all([
        fork(requestInfoItem),
    ])
}
