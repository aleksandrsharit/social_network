import React, { useState } from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import { useDispatch, useSelector } from "react-redux";
import { savePhoto } from "../../../redux/profile-reducer"
import ProfileDataForm from "./ProfileDataForm";
import { AppStateType } from "../../../redux/redux-store";
import { ProfileType } from "../../../types/types";

type ProfileInfoProps = {
  isOwner: any;
  status: string;
};


const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state: AppStateType) => state.profilePage.profile);


  if (!profile) {
    return <Preloader />
  }

  const defaultAvatar = '/picture/picture1.jpg'
  const profileImage = profile.photos.large || defaultAvatar;


  const onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  }


  return <div>
    <div className={s.descriptionBlock}>
      <img src={profileImage} alt='Profile' className={s.mainPhoto} />
      <div>
        {!props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
      </div>
      <ProfileStatus status={props.status} />
      {editMode ? <ProfileDataForm goToEditMode={() => setEditMode(false)} /> :
        <ProfileData profile={profile} isOwner={props.isOwner}
          goToEditMode={() => setEditMode(true)} />}
    </div>
  </div>
}

type ProfileDataProps = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataProps> = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {!isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    <div><b>Name</b>: {profile.fullName}</div>
    <div><b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}</div>
    {
      profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
    }
    <div><b>About me</b>: {profile.aboutMe}</div>

    <div>
      <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}

type ContactProps = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<ContactProps> = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;