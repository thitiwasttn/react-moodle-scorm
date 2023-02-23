import {ActionType} from "../action_type";
import {State} from "../LoginReducer";

interface setLoginAction {
    type: ActionType,
    payload: State
}

export type Action = setLoginAction;