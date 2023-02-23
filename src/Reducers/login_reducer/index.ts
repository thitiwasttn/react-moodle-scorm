import { combineReducers } from "redux";
import loginReducer from "./LoginReducer"

const reducers = combineReducers({
    loginReducer: loginReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>
