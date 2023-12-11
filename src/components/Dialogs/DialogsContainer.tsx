import React from 'react';
import { useSelector } from 'react-redux';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';

const DialogsContainer: React.FC = () => {
    const { dialogs, messages } = useSelector(
        (state: AppStateType) => state.dialogsPage);
    return (
        <Dialogs
            dialogs={dialogs}
            messages={messages}
        />
    );
};

export default compose(
    withAuthRedirect
)(DialogsContainer);