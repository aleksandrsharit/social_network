import React from 'react';
import s from './Post.module.css'
import { useSelector } from 'react-redux';
import PostForm from '../myPostsForm';
import { AppStateType } from '../../../../redux/redux-store';


const Post: React.FC = (props) => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts);

    let postsElements = posts.map((p) => (
        <div key={p.id} className={s.item}>
            <img src='https://sun87-1.userapi.com/impg/Ut4cw-nSS5bCwHsH2xpgsTY9a_4i13vtoItv3A/MTEkt9PW2Mk.jpg?size=2316x2316&quality=95&sign=d2d7437a9bb9ba29f125d613b081eac5&type=album' />
            {p.message}
            <div>
                <span>like</span> {p.like}
            </div>
        </div>
    ));

    return (
        <div className={s.posts}>
            <h2>My Posts</h2>
            <div>
                <PostForm />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default Post;