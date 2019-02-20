import {GetInfoItemType} from '../types'

export function getInfoItemScan(code: string) {
    return {
        type: GetInfoItemType.REQUEST_INFO_ITEM,
        code,
    }
}