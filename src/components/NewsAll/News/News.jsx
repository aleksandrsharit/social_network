import React from 'react';
import s from './../NewsAll.module.css'

const News = (props) => {
    return (
        <div id={props.id} className={s.itemChildren}>
            <div>
                <img className={s.newsImg} src={props.img} alt="News Image" />
            </div>
            <div>
                {<img className={s.commentImg} src='https://sun87-1.userapi.com/impg/pC523ijNtQA51XzbTbgb10aNUuzM80tUjpYLNg/bc9Wiw_eHtM.jpg?size=1170x2080&quality=95&sign=6ea940af89aab700978bcd6a071b3964&type=album' />} 
                <div>Саша:
                <div>{props.comment}</div></div>
            </div>
            <div>
                <span>like</span> {props.like}
            </div>
        </div>
    )
}

export default News;