import React from "react";
import s from './../Dialogs.module.css';
import { MessageType } from "../../../types/types";

const Message: React.FC<MessageType> = (props) => {
    return <div id={props.id.toString()} className={s.message}>{props.message}</div>
}

export default Message;