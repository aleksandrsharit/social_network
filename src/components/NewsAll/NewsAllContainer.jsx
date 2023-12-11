import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAC, updateNewNewTextAC } from '../../redux/news-reducer.ts';
import NewsAll from './NewsAll';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


const NewsAllContainer = () => {
  const dispatch = useDispatch();
  const news = useSelector(state => state.newsPage.news);
  const newNewText = useSelector(state => state.newsPage.newNewText);
  const onAddNew = () => {
    dispatch(addNewAC());
  };

  const onNewChangeUpdate = (text) => {
    dispatch(updateNewNewTextAC(text));
  };

  return (
    <NewsAll
      news={news}
      newNewText={newNewText}
      onAddNew={onAddNew}
      onNewChangeUpdate={onNewChangeUpdate}
    />
  );
};


export default compose(
  withAuthRedirect
)(NewsAllContainer)