import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (Username, Email, Password, Birthday_date) => {
    const {data} = await $host.post('api/user/registration', {Username, Email, Password, Role: 'USER', Birthday_date}) 
    localStorage.setItem('token', data)
    return jwtDecode(data)
}

export const login = async (Username, Password) => {
    const {data} = await $host.post('api/user/login', {Username, Password})
    localStorage.setItem('token', data)
    return jwtDecode(data)
}

export const check = async () => {    
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)    
}