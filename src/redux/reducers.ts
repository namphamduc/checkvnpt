import {combineReducers} from 'redux'
import login from './reducers/LoginReducer'
import history from './reducers/HistoryReducer'
import infoItem from './reducers/InfoItemReducer'

const rootReducers = combineReducers({
    login, infoItem, history
})
export default rootReducers
