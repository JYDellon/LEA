import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  URL_HOME,
  URL_AUTHFORM,
  URL_FORGOT_PASSWORD,
  URL_FORGOT_PASSWORD_EMAIL_SENT,
} from "../../constants/urls/urlFrontEnd";
import { useFormValidation } from "./FormValidationContext";
import { forgotPassword } from "./../../api/backend/account";

/**
 * Component ForgotPassword
 */

const ForgotPassword = () => {
  const { setIsFormValidated } = useFormValidation();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("Veuillez saisir votre adresse e-mail."),
  });

  const handleForgotPassword = async (values) => {
    setErrorMessage(null);
  
    try {
      const response = await forgotPassword(values);
    
      // Log de la réponse du serveur
      console.log('Réponse du serveur:', response);
  
      // Récupère la réponse du serveur
      const result = response.data;
      console.log('Données de la réponse:', result);
  
      if (response.status === 200) {
        setIsFormValidated(true);
        console.log('Form validé, navigation vers', URL_FORGOT_PASSWORD_EMAIL_SENT);
        navigate(URL_FORGOT_PASSWORD_EMAIL_SENT);
      } else {
        console.log('Erreur de requête:', result.message);
        const error = "Email introuvable."
        setErrorMessage(error);
      }
    } catch (error) {
      console.error('Erreur de requête:', error);
      const errorMessage = "Email introuvable."
      setErrorMessage(errorMessage);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-[85vh] md:h-[60vh] relative">
      <div className="absolute top-5 left-0 pl-4 text-sm font-medium">
        <Link to={URL_HOME}>Accueil</Link> |{" "}
        <Link to={URL_AUTHFORM}>S'identifier</Link> |{" "}
        <Link to={URL_FORGOT_PASSWORD}>Mot de passe oublié</Link>
      </div>
      <div className="w-full max-w-[650px] bg-white px-4">
        <div className="text-center">
          <div>
            <h1 className="mb-6 text-3xl font-extrabold tracking-[-0.5px] text-size32">
              Mot de passe oublié&nbsp;?
            </h1>
            <p>
              Pas de panique ! Remplissez le formulaire ci-dessous et nous vous
              enverrons par email les informations pour vous reconnecter.
            </p>
          </div>

          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={handleForgotPassword}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className="relative mt-8 space-y-6 p-2 sm:p-0">
                <div className="flex flex-col gap-1.5">
                  <div className="relative mt-5">
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Adresse e-mail"
                      autoComplete="email"
                      className="input mt-2"
                    />
                    <label htmlFor="email" className="text-sm font-medium">
                      Indiquez l'adresse email que vous nous avez communiquée
                      lors de votre inscription.
                    </label>
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-black group mt-5">
                    Réinitialiser mon mot de passe →
                  </button>
                </div>
                {/* Afficher le message d'erreur si présent */}
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
