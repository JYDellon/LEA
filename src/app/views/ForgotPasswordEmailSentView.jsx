import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  URL_HOME,
  URL_AUTHFORM,
  URL_FORGOT_PASSWORD,
} from "../constants/urls/urlFrontEnd";
import { useFormValidation } from "../components/account/FormValidationContext";

const ForgotPasswordEmailSentView = () => {
  const { isFormValidated } = useFormValidation();

  if (!isFormValidated) {
    return <Navigate to={URL_HOME} />;
  }

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white">
      <div className="flex items-center justify-center h-[70vh] md:h-[60vh] relative">
        <div className="absolute top-5 left-0 pl-4 text-sm font-medium">
          <Link to={URL_HOME}>Accueil</Link> |{" "}
          <Link to={URL_AUTHFORM}>S'identifier</Link> |{" "}
          <Link to={URL_FORGOT_PASSWORD}>Mot de passe oublié</Link>
        </div>
        <div className="w-full max-w-[650px] bg-white px-4">
          <div className="text-center">
            <div>
              <h1 className="mb-6 text-3xl font-extrabold tracking-[-0.5px] text-size32">
                Email envoyé !
              </h1>
              <p>
                Vous allez recevoir un message à l’adresse indiquée contenant un
                lien qui vous permettra de réinitialiser votre mot de passe. Si le message
                n’apparaît pas dans votre boîte de réception, veuillez vérifier
                que celui-ci n’est pas dans vos messages indésirables.
              </p>
              <Link to={URL_AUTHFORM}>
                <button className="btn btn-black mt-10">
                  Retour →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmailSentView;
