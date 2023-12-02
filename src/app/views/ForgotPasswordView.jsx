import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { URL_HOME } from "../constants/urls/urlFrontEnd";
import ForgotPassword from "../components/account/ForgotPassword";
import { selectIsLogged } from "../redux-store/authenticationSlice";

const ForgotPasswordView = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsLogged);

  useEffect(() => {
    if (isAuthenticated) navigate(URL_HOME);
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white">
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordView;
