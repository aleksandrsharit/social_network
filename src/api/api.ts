import axios from "axios";
import { PhotosType, ProfileType, UserType } from "../types/types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '27eaee58-f223-45ae-ad3b-b984db4f72da'
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null 
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: any
    resultCode: RC
}












