import React from 'react';
import classNames from 'classnames';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import s from './Dialogs.module.css';
import { actions } from '../../redux/dialogs-reducer';

type FormValues = {
    name: string;
    message: string;
};

type ValidateFunction = (values: FormValues) => Record<string, string>;

type SubmitFunction = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
) => void;

const initialValues: FormValues = {
    name: '',
    message: '',
};

const validate: ValidateFunction = (values) => {
    const errors: Record<string, string> = {};

    if (!values.name) {
        errors.name = 'Поле обязательно для заполнения';
    } else if (values.name.length > 10) {
        errors.name = 'Максимальная длина сообщения - 10 символов';
    }

    if (!values.message) {
        errors.message = 'Поле обязательно для заполнения';
    } else if (values.message.length > 10) {
        errors.message = 'Максимальная длина сообщения - 10 символов';
    }

    return errors;
};

const MessageForm: React.FC = () => {
    const dispatch = useDispatch();

    const onSubmit: SubmitFunction = (values, { resetForm }) => {
        dispatch(actions.sendNameCreator(values.name));
        dispatch(actions.sendMassageCreator(values.message));
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
                    <div
                        className={classNames(s.formControl, {
                            [s.error]: errors.name && touched.name,
                        })}
                    >
                        <label htmlFor="name"></label>
                        <Field type="text" id="name" name="name" placeholder="Enter your name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div
                        className={classNames(s.formControl, {
                            [s.error]: errors.message && touched.message,
                        })}
                    >
                        <label htmlFor="message"></label>
                        <Field type="text" id="message" name="message" placeholder="Enter your message" />
                        <ErrorMessage name="message" component="div" />
                    </div>
                    <div>
                        <button type="submit">Отправить</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MessageForm;

