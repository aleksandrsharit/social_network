import { NewsType } from "../types/types";

const ADD_NEW = 'ADD-NEW';
const UPDATE_NEW_NEW_TEXT = 'UPDATE-NEW-NEW-TEXT';



let initialState = {
    news: [
        {
            id: 1, img: "https://sun9-18.userapi.com/impg/Ewdjk_qL8V2Thgu8ySrvtq7ysIbq7gaLc3lhyA/jt8OKVjcbW8.jpg?size=853x1280&quality=95&sign=eadcb480dcf8bab06401e1a70656bf74&type=album",
            like: '123', comment: "Лучшая девочка!"
        },
        {
            id: 2, img: "https://sun87-1.userapi.com/impg/8mQcOSP_7_XKNxjt_THtWBPsp7Oyra9ggtv5Kg/h6W6JkJO2VA.jpg?size=853x1280&quality=95&sign=07e703421aeff44ce98aa97dcbe63aa9&type=album",
            like: '193', comment: "Wonderful lady"
        },
    ] as Array<NewsType>,
    newNewText: '',
};

export type InitialStateType = typeof initialState;

export const newsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_NEW:
            let newNew = {
                id: 3,
                img: "https://sun87-1.userapi.com/impg/Zzncfnm9EsN0KvQQDPmfBjsKVDx1mMyG7EfYWg/u9o2NPXI8Ik.jpg?size=1620x2160&quality=95&sign=a652f52ee52c09bacffb54413e5e5111&type=album",
                comment: action.newNewText,
                like: '5'
            };
            return {
                ...state,
                news: [...state.news, newNew],
                newNewText: ''
            }
        case UPDATE_NEW_NEW_TEXT:
            return {
                ...state,
                newNewText: action.text
            }
        default:
            return state;
    }
}

type AddNewACActionType = {
    type: typeof ADD_NEW
}
export const addNewAC = (): AddNewACActionType => ({ type: ADD_NEW });

type UpdateNewNewTextACActionType = {
    type: typeof UPDATE_NEW_NEW_TEXT
    text: string
}
export const updateNewNewTextAC = (text: string): UpdateNewNewTextACActionType => ({ type: UPDATE_NEW_NEW_TEXT, text });

export default newsReducer