import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, nick, comment='', password) => {
    const {data} = await $host.post('api/user/registration', {email, nick, comment, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.removeItem('token')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchAllUsers = async () => {
    const {data} = await $authHost.get('api/admin/users')
    return data;
}
export const modifyUser = async (id, role) => {
    const {data} = await $authHost.post('api/user/modify', {id, role})
    return data;
}