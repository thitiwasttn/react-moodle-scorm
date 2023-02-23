import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import reducers from "./Reducers/login_reducer";
// @ts-ignore
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'



const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(
        persistedReducer,
        {},
        applyMiddleware(thunk)
    )
    let persistor = persistStore(store)
    return { store, persistor }
}