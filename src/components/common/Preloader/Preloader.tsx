import React, { FC } from 'react';
import preloader from './../../../assets/images/preloader.gif';

const Preloader: FC = () => {
    return (
        <div style={{ width: '300px' }}>
            <img src={preloader} alt="Loading..." />
        </div>
    );
};

export default Preloader;