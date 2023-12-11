import { BaseThunkType } from "../redux/redux-store"

export type PostType = {
    id: number
    message: string
    like: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ContactsType | any
    profile: ProfileType | null
    photos: PhotosType
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
    unfollow: (id: number) => BaseThunkType
    follow: (id: number) => BaseThunkType
}

export type DialogType = {
    id: number
    name: string
}


export type MessageType = {
    id: number
    message: string
}

export type NewsType = {
    id: number
    img: string
    like: string
    comment: string
}

export type ServerErrorType = {
    serverError: string | null
}