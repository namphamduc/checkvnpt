import {InfoUserType, LoginType} from '../types'

export function getInfoUser(token :string) {
    return {
        type: InfoUserType.REQUEST_INFO_USER,
        token
    }
}