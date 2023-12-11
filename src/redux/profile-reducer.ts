import { useSelector } from "react-redux";
import { PhotosType, PostType, ProfileType, ServerErrorType } from "../types/types";
import { profileAPI } from "../api/profile-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    posts: [
        { id: 1, message: "Hello", like: 103 },
        { id: 2, message: "Bye", like: 133 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    serverError: null as ServerErrorType | null,
    newPostText: ''
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            let newPost = {
                id: 3,
                message: action.newPostText,
                like: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return { ...state, profile: action.profile };
        }
        case 'SN/PROFILE/DELETE_POST': {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) };
        }
        case 'SN/PROFILE/SET_STATUS': {
            return { ...state, status: action.status };
        }
        case 'SN/PROFILE/SAVE_PHOTO': {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
        }
        case 'SN/PROFILE/SET_ERRORS': {
            return { ...state, serverError: {serverError: action.error} };
        }
        default:
            return state;
    }
};

export const actions = {
    addPostAC: (newPostText: string) => ({ type: 'SN/PROFILE/ADD-POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO', photos } as const),
    setServerErrors: (error: string) => ({ type: 'SN/PROFILE/SET_ERRORS', error } as const)
}

export const getUserProfile = (userId: any): any => async (dispatch: any) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: any): any => async (dispatch: any) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status: any): any => async (dispatch: any) => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        alert('error')
    }
}

export const savePhoto = (file: File): any => async (dispatch: any) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: any, userId: number | null): any => async (dispatch: any) => {
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }
    }
    else {
        dispatch(actions.setServerErrors(data.messages));
    }
}


export default profileReducer;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;