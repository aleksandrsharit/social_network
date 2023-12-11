import { ResultCodesEnum, ResultCodesForCaptcha } from "../api/api";
import { securityAPI } from "../api/security-api"
import { Dispatch } from "react";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/auth-api";
import { useFormAction } from "react-router-dom";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    serverError: [],
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'SN/AUTH/SET_ERRORS': {
            return { ...state, serverError: action.error };
        }
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS': {
            return { ...state, captchaUrl: action.payload };
        }

        default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA', payload:
            { userId, email, login, isAuth }
    } as const),
    setServerErrors: (error: string) => ({
        type: 'SN/AUTH/SET_ERRORS', error
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        const { id, login, email } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string | null, password: string | null, rememberMe: boolean, captcha: any): ThunkType =>
    async (dispatch) => {
        if (!email || !password) {
            return
        }
        const data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            dispatch(actions.setServerErrors(data.messages));
        }
    }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): any => async (dispatch: any) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

export default authReducer; 