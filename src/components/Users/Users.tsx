import React, { FC, useEffect } from 'react'
import s from './Users.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { actions, follow, getUsers, unfollow } from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { AppStateType } from '../../redux/redux-store'
import { UserType } from '../../types/types'
import { Formik } from 'formik'


const Users: React.FC = () => {
    const dispatch = useDispatch()
    const { currentPage, pageSize, isFetching, totalUsersCount, users, followingInProgress } = useSelector(
        (state: AppStateType) => state.usersPage
    )


    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize));
    }, [dispatch, currentPage, pageSize, followingInProgress]);

    let changePage = (currentPage: number) => {
        dispatch(actions.setCurrentPageAC(currentPage));
        dispatch(getUsers(currentPage, pageSize));
    }

    let usersElements = users.map((u: UserType) =>
        < User
            user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
        />)


    return <div>
        <span>
            {isFetching ?
                <div className={s.fetchingPhoto}>
                    <Preloader />
                </div> : null}
        </span>
        <div>
            <UsersSearchForm />
        </div>
        <Paginator currentPage={currentPage} changePage={changePage}
            totalUsersCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {usersElements}
        </div>
    </div >
};

const UsersSearchForm = () => {

    return <div>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}


export default compose<React.ComponentType>(
    withAuthRedirect
)(Users)
