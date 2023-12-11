import { Form, Formik } from "formik"
import React from "react"
import { createField } from "../../common/FormsControls/FormsControls"
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../../../redux/profile-reducer";
import s from '../../Dialogs/Dialogs.module.css';
import { AppStateType } from "../../../redux/redux-store";
import Preloader from "../../common/Preloader/Preloader";

type ServerErrorType = {
  serverError: string[]
}

interface ProfileDataFormProps {
  goToEditMode: () => void;
}

const ProfileDataForm: React.FC<ProfileDataFormProps> = ({ goToEditMode }) => {
  const userId = useSelector((state: AppStateType) => state.auth.userId);
  const profile = useSelector((state: AppStateType) => state.profilePage.profile);
  const serverError = useSelector((state: AppStateType) => state.profilePage.serverError) || [];
  const dispatch = useDispatch();

  const initialValues = profile
    ? {
      ...profile,
      contacts: { ...profile.contacts }
    }
    : {
      fullName: '',
      lookingForAJobDescription: '',
      lookingForAJob: false,
      aboutMe: '',
      contacts: {
        facebook: '',
        website: '',
        twitter: '',
        instagram: '',
        youtube: '',
        github: '',
      }
    };

  const changeEdit = () => {
    goToEditMode()
  }

  const onSubmit = (values: typeof initialValues) => {
    const newProfile = {
      'fullName': values.fullName,
      'lookingForAJobDescription': values.lookingForAJobDescription,
      'lookingForAJob': values.lookingForAJob,
      'aboutMe': values.aboutMe,
      'contacts': values.contacts
    }
    dispatch(saveProfile(newProfile, userId))
    { !serverError && changeEdit() };
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >

      <Form >
        <div className={s.errors}>
          {Array.isArray(serverError) && serverError.map((error: string, index: number) => (
            <div key={index}>{error}</div>
          ))}
        </div>
        <div><button type='submit' onClick={changeEdit} >save</button></div>
        <div >
          <b>Name</b>: <br />
          {createField('input', 'fullName', 'fullName', 'Full name', 'div')}
        </div>
        <div>
          <b>Looking for a job</b>:
          {createField('checkbox', 'lookingForAJob', 'lookingForAJob', 'LookingForAJob', 'div')}
        </div>
        <div>
          <b>My professional skills</b>: <br />
          {createField('textarea', 'lookingForAJobDescription', 'lookingForAJobDescription', 'Looking for a job description', 'div')}
        </div>
        <div><b>About me</b>: <br />
          {createField('textarea', 'aboutMe', 'aboutMe', 'About me', 'div')}
        </div>

        <div>
          <b>Contacts: </b> {Object.keys(initialValues.contacts).map(key => {
            return <div key={key}><b>{key}: {createField('input', key, 'contacts.' + key, key, 'div')}</b></div>
          })}
        </div>
      </Form>
    </Formik >
  )
}


export default ProfileDataForm;