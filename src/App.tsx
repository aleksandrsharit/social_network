import React, { useEffect, Suspense, lazy } from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/Navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Users from './components/Users/Users';
import NewsAllContainer from './components/NewsAll/NewsAllContainer';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
// const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));



function App() {
  const dispatch = useDispatch();
  const initialized = useSelector((state: AppStateType) => state.app.initialized);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Preloader />
  }

  return (
    <div className='app-wrapper'>
      <Header />
      <NavBar />
      <div className="app-wrapper-content">
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/profile/:userId?"
              element={<Profile />} />
            <Route path="/"
              element={<Profile />} />
            <Route path="/news"
              element={<NewsAllContainer />}
            />
            <Route path="/users"
              element={<Users />}
            />
            <Route path="/login"
              element={<Login />}
            />
            <Route path="*"
              element={<div>404 NOT FOUND</div>}
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

const SamuraiJSApp: React.FC = (props) => {
  return <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
}

export default SamuraiJSApp;

