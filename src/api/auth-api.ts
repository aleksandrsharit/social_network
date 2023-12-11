import { ResponseType, ResultCodesEnum, ResultCodesForCaptcha, instance } from "./api"

type MeResponseType = {
    id: number
    email: string
    login: string
}

type LoginResponseType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodesEnum | ResultCodesForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}