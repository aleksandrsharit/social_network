import { DialogType, MessageType } from "../types/types"
import { InferActionsTypes } from "./redux-store"

let initialState = {
    dialogs: [
        { id: 1, name: 'Sana' },
        { id: 2, name: 'Kirill' },
        { id: 3, name: 'Maksim' },
        { id: 4, name: 'Denis' },
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hi' },
        { id: 3, message: 'Hi' },
        { id: 4, message: 'Hi' },
    ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE':
            let newDialog = {
                id: 5,
                message: action.dialog,
            };
            return {
                ...state,
                messages: [...state.messages, newDialog],
            }
        case 'SN/DIALOGS/SEND-NAME':
            let newName = {
                id: 5,
                name: action.name,
            };
            return {
                ...state,
                dialogs: [...state.dialogs, newName],
            }
        default:
            return state;
    }
}

export const actions = {
    sendMassageCreator: (dialog: string) => ({ type: 'SN/DIALOGS/SEND-MESSAGE', dialog } as const),
    sendNameCreator: (name: string) => ({ type: 'SN/DIALOGS/SEND-NAME', name } as const)
}

export default dialogsReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>