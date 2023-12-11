import React from 'react';
import classNames from 'classnames';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useDispatch } from "react-redux";
import s from './MyPosts.module.css'
import { actions } from '../../../redux/profile-reducer';

type FormValues = {
    post: string;
}

const initialValues: FormValues = {
    post: '',
};


const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.post) {
        errors.post = 'Поле обязательно для заполнения';
    } else if (values.post.length > 10) {
        errors.post = 'Максимальная длина сообщения - 10 символов';
    }
    return errors;
};


const PostForm: React.FC = () => {
    const dispatch = useDispatch();

    const onSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        dispatch(actions.addPostAC(values.post));
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className={classNames(s.formControl, { [s.error]: errors.post && touched.post })}>
                        <label htmlFor='post'></label>
                        <Field type='text' id='post' name='post' placeholder='Enter your post' />
                        <ErrorMessage name='post' component='div' />
                    </div>
                    <div>
                        <button type='submit'>Отправить</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default PostForm;