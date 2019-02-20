import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducers from './reducers'
import rootSaga from './sagas';

//persitsInit
const persistConfig = {
    key: 'key',
    whitelist: ['auth'],
    storage,
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const reducer = persistReducer(persistConfig, rootReducers);

const store = createStore(reducer,
    applyMiddleware(sagaMiddleware));

// let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {
    store,
    // persistor
}