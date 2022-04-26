import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import DatesBar from "../components/DatesBar";

export const createPhoto = async (photo) => {
    const {data} = await $authHost.post('api/admin/photos', photo)
    return data
}

export const fetchPhotos = async (createdAt, page, limit= 20) => {
    const {data} = await $authHost.get('api/photos', {params: {
            createdAt, page, limit
        }})
    return data
}

export const fetchOnePhoto = async (id) => {
    const {data} = await $authHost.get('api/photos/id/' + id)
    return data
}
export const fetchAllDates = async () => {
    const {data} = await $authHost.get('api/photos/dates');
    return data
}
