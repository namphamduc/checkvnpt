import {combineReducers} from 'redux'
import login from './reducers/LoginReducer'
import history from './reducers/HistoryReducer'
import infoItem from './reducers/InfoItemReducer'
import infoUser from './reducers/InfoUserReducer'

const rootReducers = combineReducers({
    login, infoItem, history, infoUser
})
export default rootReducers
