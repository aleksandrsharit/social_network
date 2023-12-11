import React, { FC } from 'react';
import s from './Users.module.css'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType
    followingInProgress: number[]
    unfollow: (id: number) => any
    follow: (id: number) => any

}

const User: FC<PropsType> = (props) => {
    const dispatch = useDispatch();
    let u = props.user;


    return <div>
        <span>
            <div className={s.userPhoto} >
                <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small
                        : '/picture/picture1.jpg'} alt='User Avatar' />
                </NavLink>
            </div>
            <div>
                {u.followed
                    ?
                    <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                        dispatch(props.unfollow(u.id));

                    }}>unfollow</button>
                    :
                    <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                        dispatch(props.follow(u.id));
                    }}>follow</button>}
            </div>
        </span>
        <span>
            <span>
                <div>{u.name}</div>
                <div>{u.id}</div>
                <div>{u.status}</div>
            </span>
            <span>
                {/* <div>{u.location.country}</div> */}
                {/* <div>{u.location.city}</div> */}
            </span>
        </span>
    </div>
}


export default User;
