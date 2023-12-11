import { Dispatch } from "react"
import { usersAPI } from "../api/users-api"
import { updateObjectInArray } from "../components/utils/object-helpers"
import { PhotosType, UserType } from "../types/types"
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store"
import { ThunkAction } from "redux-thunk"
import { AnyAction } from "redux"
import { useDispatch } from "react-redux"


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    // currentPage: savedPage ? Number(savedPage) : 1,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id 
}
const UsersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
            };
        }
        case "UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            };
        }
        case "SET_USERS": {
            return { ...state, users: action.users }
        }
        case "SET_CURRENT_PAGE": {
            return { ...state, currentPage: action.currentPage }
        }
        case "SET_TOTAL_COUNT": {
            return { ...state, totalUsersCount: action.count }
        }
        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.booleanState ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

export const actions = {
    acceptFollow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    acceptUnfollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsersAC: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPageAC: (currentPage: number) => {
        // localStorage.setItem('currentPage', currentPage: number);
        return { type: 'SET_CURRENT_PAGE', currentPage } as const
    },
    setTotalUsersCountAC: (count: number) => ({ type: 'SET_TOTAL_COUNT', count } as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (booleanState: boolean, userId: number) =>
        ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', booleanState, userId } as const)
}

export const getUsers = (currentPage: number,
    pageSize: number): any => async (dispatch: DispatchType) => {
        dispatch(actions.toggleIsFetchingAC(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetchingAC(false))
        dispatch(actions.setUsersAC(data.items))
        dispatch(actions.setTotalUsersCountAC(data.totalCount))
    }

const _followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes
) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}


export const follow = (userId: number): any => async (dispatch: DispatchType) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.acceptFollow)
}

export const unfollow = (userId: number): any => async (dispatch: DispatchType) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.acceptUnfollow)
}

export default UsersReducer;

export type ActionsTypes = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type DispatchType = ReturnType<typeof useDispatch>
export type ThunkType = BaseThunkType<ActionsTypes>;
