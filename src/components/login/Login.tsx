import React from 'react';
import classNames from 'classnames';
import { Formik, Form } from 'formik';
import s from '../Dialogs/Dialogs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { useNavigate } from 'react-router-dom';
import { createField } from '../common/FormsControls/FormsControls.js';
import { AppStateType } from '../../redux/redux-store';

type LoginFormActionsType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}

const LoginForm: React.FC = () => {
    const initialValues: LoginFormActionsType = {
        login: '',
        password: '',
        rememberMe: false,
        captcha: '',
    };

    const validate = (values: LoginFormActionsType) => {
        const errors: Record<string, string> = {};

        if (!values.login) {
            errors.login = 'Поле обязательно для заполнения';
        } else if (values.login.length > 30) {
            errors.login = 'Максимальная длина сообщения - 10 символов';
        }

        if (!values.password) {
            errors.password = 'Поле обязательно для заполнения';
        } else if (values.password.length > 30) {
            errors.password = 'Максимальная длина сообщения - 10 символов';
        }

        return errors;
    };
    const dispatch = useDispatch();
    const serverError = useSelector((state: AppStateType) => state.auth.serverError) || [];
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);

    type LoginActionType = {
        login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
    }


    const onSubmit = (values: LoginFormActionsType) => {
        // @ts-ignore
        dispatch(login(values.login, values.password, values.rememberMe, values.captcha));
    };

    return (
        <Formik<LoginFormActionsType>
            initialValues={initialValues}
            validate={validate}
            // @ts-ignore
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className={classNames(s.formControl, { [s.error]: errors.login && touched.login })}>
                        {createField('input', 'login', 'login', 'Login', 'div')}
                    </div>
                    <div className={classNames(s.formControl, { [s.error]: errors.password && touched.password })}>
                        {createField('password', 'password', 'password', 'Password', 'div')}
                    </div>
                    <div>
                        {createField('checkbox', 'rememberMe', 'rememberMe', 'Remember me', 'div')}
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>
                    <div className={s.errors}>
                        {serverError}
                    </div>
                    <div className={s.captcha}>
                        {captchaUrl && <img src={captchaUrl} alt="Captcha" />}
                        {captchaUrl && createField('input', 'captcha', 'captcha', 'captcha', 'div')}
                    </div>

                </Form>
            )}
        </Formik>
    );
};


const Login = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const navigate = useNavigate();


    if (isAuth) {
        navigate('/profile');
    }
    return (
        <div>
            <h1>Вход</h1>
            <LoginForm />

        </div>

    );
};

export default Login;