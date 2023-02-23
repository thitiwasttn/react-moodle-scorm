import {UserM} from "../../Model/UserM";

export type UserLogin = {
    userId?: string,
    username?: string
    user: UserM
}

export type Role = {
    roleId: string,
    roleName: string
}