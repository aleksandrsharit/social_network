import React from 'react';
import s from './NewsAll.module.css'
import News from './News/News';

const NewsAll = (props) => {
    let newsElements = props.news.map((n) => (<News id={n.id} key={n.id} img={n.img}
        like={n.like} comment={n.comment} />))

    let addNew = () => {
        props.onAddNew();
    }

    let updateNewPostText = (e) => {
        let text = e.target.value;
        props.onNewChangeUpdate(text);
    }

    return <div className={s.item}>
        {newsElements}
        <div>
            <textarea onChange={updateNewPostText} placeholder='Введите ваш комментарий' />
        </div>
        <div>
            <button onClick={addNew}>add new</button>
        </div>
    </div>
}


export default NewsAll;