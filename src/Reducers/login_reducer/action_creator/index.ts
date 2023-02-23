import {Dispatch} from "redux"
import {ActionType} from "../action_type"
import {Action} from "../action";
import {UserLogin} from "../../../Login/Model/AdminLogin";
// import {AdminLogin} from "../../../Features/Login/Model/AdminLogin";

export const setToken = (token?: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_TOKEN,
            payload: {
                token: token
            }
        })
    }
}

export const setUserId = (adminId?: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_USER_ID,
            payload: {
                adminId: adminId
            }
        })
    }
}

export const setUser = (admin?: UserLogin) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_ALL,
            payload: {
                user: admin
            }
        })
    }
}