import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import MessageForm from "./DialogsFormik";
import { initialStateType } from "../../redux/dialogs-reducer";
import { DialogType, MessageType } from "../../types/types";


type OwnPropsType = {
    dialogPage?: initialStateType;
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let dialogsElements = props.dialogs.map((d: DialogType) => (<DialogItem id={d.id} key={d.id} name={d.name} />))
    let messagesElements = props.messages.map((m: MessageType) => (<Message id={m.id} key={m.id} message={m.message} />))


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <MessageForm />
            </div>
        </div>
    )
}

export default Dialogs;