import {HistoryType} from '../types'

export function getHistory() {
    console.log('getHistory  action')
    return {
        type: HistoryType.REQUEST_HISTORY,
    }
}