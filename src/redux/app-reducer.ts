import { useDispatch } from "react-redux";
import { getAuthUserData } from "./auth-reducer";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
};

export const actions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}

export const initializeApp = (): any => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}


export default appReducer; 

export type ActionsTypes = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type DispatchType = ReturnType<typeof useDispatch>
export type ThunkType = BaseThunkType<ActionsTypes>;