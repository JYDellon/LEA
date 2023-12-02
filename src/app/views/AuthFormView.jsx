import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import Login from "../components/account/Login";
import Register from "../components/account/Register";

import { selectIsLogged } from "../redux-store/authenticationSlice";

import { URL_HOME } from "../constants/urls/urlFrontEnd";

const AuthFormView = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsLogged);
  const [isToggle, setIsToggle] = useState(false);

  // Effect pour l'authentification
  useEffect(() => {
    if (isAuthenticated) {
      navigate(URL_HOME);
    }
  }, [isAuthenticated, navigate]);

  // Effet pour déterminer quel formulaire afficher
  useEffect(() => {
    // Vérifie si l'URL est pour le login ou l'inscription
    const shouldShowLogin = location.pathname.includes("/authentification/login");
    setIsToggle(!shouldShowLogin);
  }, [location.pathname]);

  // Spring animation
  const cardFlip = useSpring({
    transform: `rotateY(${isToggle ? 180 : 0}deg)`,
  });

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white">
      <animated.div className="cardContainer" style={cardFlip}>
        <div className="card">
          <div className="cardFront">
            {!isToggle && <Login toggle={() => setIsToggle(!isToggle)} />}
          </div>
          <div className="cardBack">
            {isToggle && (
              <animated.div style={{ transform: `rotateY(180deg)` }}>
                <Register toggle={() => setIsToggle(!isToggle)} />
              </animated.div>
            )}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default AuthFormView;
