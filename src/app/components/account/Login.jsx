import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import {
  URL_FORGOT_PASSWORD,
  URL_MY_ACCOUNT,
} from "../../constants/urls/urlFrontEnd";
import { signIn } from "../../redux-store/authenticationSlice";
import { authenticate } from "./../../api/backend/account";
import PropTypes from "prop-types";

/**
 * Component Login
 */

const Login = ({ toggle }) => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Le format de l'adresse e-mail est invalide"
    )
      .required("L'adresse e-mail est requise"),
    password: Yup.string()
      .min(8, "Le mot de passe doit comporter au moins 8 caractères")
      // .matches(
      //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      //   "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
      // )
      .required("Le mot de passe est requis"),
  });

  const handleLogin = async (values) => {
    setErrorLog(null);

    try {
      const res = await authenticate({
        username: values.email,
        password: values.password,
      });

      if (res.status === 200 && res.data.token) {
        dispatch(signIn(res.data.token));
        navigate(URL_MY_ACCOUNT);
      } else {
        setErrorLog("Échec de la connexion.");
      }
    } catch (error) {
      let errorMessage = "Une erreur est survenue lors de la connexion.";
    
      if (error.response && error.response.data && error.response.data.message) {
        // Vérifie si le message d'erreur est celui par défaut pour les informations d'identification invalides
        errorMessage = error.response.data.message === 'Invalid credentials.'
          ? "C'est incorrect, vérifiez l'adresse mail et le mot de passe saisis." // Message personnalisé pour les informations d'identification invalides
          : error.response.data.message; // Autres messages d'erreur (par exemple, ceux de CustomUserChecker ou des erreurs de regex)
      }
    
      setErrorLog(errorMessage); // Affiche le message d'erreur final
    }
    
  };

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white md:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:order-2 md:my-16 my-5 p-4 xl:pl-20 xl:pr-0 flex flex-col justify-center">
          <div>
            <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.5px] text-size32">
              S'identifier
            </h1>
          </div>

          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
            }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className="relative mt-8 space-y-6 p-2 sm:p-0">
                <div className="flex flex-col gap-1.5">
                  <div className="relative mt-5">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Adresse e-mail"
                      autoComplete="email"
                      className="input mt-2"
                      onFocus={() => setErrorLog(null)}
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>
                  <PasswordInput
                    name="password"
                    label="Mot de passe"
                    />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">
                    <Link to={URL_FORGOT_PASSWORD}>
                      <span className="cursor-pointer font-medium text-customBlue hover:text-customBlue hover:underline text-size16">
                        Mot de passe oublié ?
                      </span>
                    </Link>
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-black group mt-5">
                    Se connecter →
                  </button>
                </div>
                {errorLog && (
                  <div className="flex justify-center">
                    <small className="text-sm italic text-red-500">
                      {errorLog}
                    </small>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <div className="sm:col-span-1 min-h-[385px] md:min-h-[685px] sm:my-16 mb-5 flex flex-col items-center justify-center gap-7 backgroundCreateAccount">
          <h2 className="text-3xl text-white font-bold tracking-[-0.5px] text-size32">
            Nouveau client ?
          </h2>
          <button onClick={toggle} className="btn btn-transparent">
            Créer un compte →
          </button>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Login;
