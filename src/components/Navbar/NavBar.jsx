import React from 'react';
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return <nav className={s.nav}>
    <div className={s.item}>
      <NavLink to='/profile' activeClassName={s.active} className={s.link}>Profile</NavLink>
    </div>
    <div className={s.item}>
      <NavLink to='/dialogs' activeClassName={s.active} className={s.link}>Message</NavLink>
    </div>
    <div className={s.item}>
      <NavLink to='/news' activeClassName={s.active} className={s.link}>News</NavLink>
    </div>
    <div className={s.item}>
      <NavLink to='/users' activeClassName={s.active} className={s.link}>Users</NavLink>
    </div>
    <div className={s.item}>
      <a>Music</a>
    </div>
    <div className={s.item}>
      <a>Setting</a>
    </div>
  </nav>
}

export default NavBar;