import {UserM} from "../../Model/UserM";

export type UserLogin = {
    userId?: string,
    username?: string
    user: UserM
    password?: string
}

export type Role = {
    roleId: string,
    roleName: string
}