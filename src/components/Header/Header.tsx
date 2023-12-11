import React from 'react';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const login = useSelector((state: AppStateType) => state.auth.login);

    const ecs = () => {
        dispatch(logout())
    }

    return <header className={s.header}>
        <img src='/picture/picture.jpg' alt='Красавчикк' />

        <div className={s.loginBlock}>
            {isAuth ? login
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
        <div className={s.buttonClass}>
            {isAuth ? <button onClick={ecs}>Log out</button> : ''}
        </div>
    </header>
}

export default Header;