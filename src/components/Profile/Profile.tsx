import React, { useEffect } from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, getUserProfile } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import Post from './MyPosts/Post/Post';
import { AppStateType } from '../../redux/redux-store';


const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.profilePage.status);
  const myUserId = useSelector((state: AppStateType) => state.auth.userId);


  const { userId } = useParams<{ userId?: string }>();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(getStatus(userId));
    } else {
      dispatch(getUserProfile(myUserId));
      dispatch(getStatus(myUserId));
    }
  }, [userId]);



  return <div>
    <ProfileInfo
      isOwner={userId}
      status={status}
    />
    <Post />
  </div>
}

export default compose<React.ComponentType>(
  withAuthRedirect
)(Profile)