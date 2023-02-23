import {Action} from "./action";
import {ActionType} from "./action_type";
import {UserLogin} from "../../Login/Model/AdminLogin";

export type State = {
    adminId?: string
    token?: string
    user?: UserLogin
};

let initState = {
    token: '',
    userId: 0,
};
const tokenReducer = (state: State = initState, action: Action): State => {
    switch (action.type) {
        case ActionType.SET_USER_ID:
            return {
                ...state,
                adminId: action.payload.adminId,
            }
        case ActionType.SET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
            }
        case ActionType.SET_ALL:
            return {
                ...state,
                user: action.payload.user,
            }
        default:
            return state
    }
}

export default tokenReducer;

