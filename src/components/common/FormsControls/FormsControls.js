import React from "react";
import s from "./FormControl.module.css"
import { ErrorMessage, Field } from "formik";

export const Textarea = (props) => {
    return (
        <div>
            <div className={s.formControl + ' ' + s.error}>
                <textarea {...props} />
            </div>
            <div>
                <span>'some error'</span>
            </div>
        </div>
    )
}

export const createField = (type, id, name, placeholder, component) => (
    <>
        <label htmlFor={id} ></label>
        <Field type={type} id={id} name={name} placeholder={placeholder} />
        <ErrorMessage name={name} component={component} />
    </>
)