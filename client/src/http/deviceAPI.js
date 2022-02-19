import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createPhoto = async (photo) => {
    const {data} = await $authHost.post('api/photos', photo)
    return data
}

export const fetchPhotos = async (createdAt, page, limit= 5) => {
    const {data} = await $host.get('api/photos', {params: {
            createdAt, page, limit
        }})
    return data
}

export const fetchOnePhoto = async (id) => {
    const {data} = await $host.get('api/photos/' + id)
    return data
}
