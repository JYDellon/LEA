import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { URL_AUTHFORM } from '../constants/urls/urlFrontEnd';
import { selectIsLogged } from './../redux-store/authenticationSlice';
import MyAccount from './../components/account/MyAccount';

const MyAccountView = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsLogged);

    useEffect(() => {
        if (!isAuthenticated) navigate(URL_AUTHFORM);
    }, []);

    return (
        <div className="mx-auto max-w-screen-xl w-full bg-white">
            <MyAccount />
        </div>
    );
};

export default MyAccountView;
