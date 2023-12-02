import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { URL_AUTHFORM } from '../constants/urls/urlFrontEnd';
import { selectIsLogged } from '../redux-store/authenticationSlice';
import ReturnItem from '../components/account/ReturnItem';

const ReturnItemView = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsLogged);

    useEffect(() => {
        if (!isAuthenticated) navigate(URL_AUTHFORM);
    }, []);

    return (
        <div className="mx-auto max-w-screen-xl w-full bg-white">
            <ReturnItem />
        </div>
    );
};

export default ReturnItemView;
