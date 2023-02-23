export type AdminLogin = {
    adminId?: string,
    email?: string
    firstName?: string,
    lastName?: string,
    accessToken?: string,
    roles: Role[],
    telno: string
}

export type Role = {
    roleId: string,
    roleName: string
}