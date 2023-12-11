import React, { ChangeEvent, useEffect, useState } from "react";
import s from './ProfileInfo.module.css'
import { updateStatus } from "../../../redux/profile-reducer";
import { useDispatch } from "react-redux";

type ProfileStatusProps = {
    status: string
}

const ProfileStatus: React.FC<ProfileStatusProps> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    const dispatch = useDispatch();

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatus(status));
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return <div>
        {editMode ?
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
            </div>
            :
            <div>
                <b>Status</b>: <span onDoubleClick={activateEditMode}>{props.status || '-----'}</span>
            </div>
        }
    </div >
}

export default ProfileStatus;