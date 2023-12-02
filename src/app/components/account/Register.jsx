import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import PropTypes from "prop-types";
import { registration } from "./../../api/backend/account";

/**
 * Component Register
 */

const Register = ({ toggle }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Trop court !")
    .max(50, "Trop long !")
    .matches(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Le prénom doit contenir uniquement des lettres, des espaces, des tirets et des apostrophes"
    )
    .required("Le prénom est requis."),
  lastName: Yup.string()
    .min(2, "Trop court !")
    .max(50, "Trop long !")
    .matches(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Le nom doit contenir uniquement des lettres, des espaces, des tirets et des apostrophes"
    )
    .required("Le nom est requis."),
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
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("Confirmez le mot de passe"),
});



  // Fonction pour envoyer l'inscription au serveur
  const handleRegister = async (values) => {
    // Efface le message s'il y a
    setSuccessMessage(null);
    setErrorMessage(null);
  
    try {
      const response = await registration(values);
 
      // Récupère la réponse du serveur
      const result = response.data;
      console.log(result);
  
      // Vérifie la réponse du serveur
      if (response.ok) {
        // Définissez le message de succès dans l'état local
        setSuccessMessage(result.message); // Utilisez la propriété 'message' du résultat
      } else {
        // Afficher un message d'erreur à l'utilisateur
        console.error(result.message);
        // Définissez le message d'erreur dans l'état local
        setErrorMessage(result.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Un utilisateur avec cette adresse e-mail existe déjà.");
      } else {
        console.error("Erreur de requête:", error.message);
        setErrorMessage(error.message);
      }
    }
    
  };
  

  return (
    <div className="mx-auto max-w-screen-xl w-full bg-white md:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:my-16 my-5 p-4 xl:pl-0 xl:pr-20 flex flex-col justify-center">
          <div>
            <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.5px] text-size32">
              S'inscrire
            </h1>
          </div>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleRegister}
            validationSchema={validationSchema}
          >
            {({ isValid, errors, touched }) => (
              <Form className="relative mt-8 space-y-6 p-2 sm:p-0">
                <div className="flex flex-col gap-1.5">
                  <div className="relative mt-5">
                    <label htmlFor="lastName">Nom</label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Nom"
                      className="input mt-2"
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="text-red-500">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="relative mt-5">
                    <label htmlFor="firstName">Prénom</label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Prénom"
                      className="input mt-2"
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="text-red-500">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="relative mt-5">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Adresse e-mail"
                      autoComplete="email"
                      className="input mt-2"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>
                  <PasswordInput name="password" label="Mot de passe" />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                  <PasswordInput
                    name="confirmPassword"
                    label="Confirmer le mot de passe"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500">{errors.confirmPassword}</div>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-black mt-5"
                  >
                    S'inscrire →
                  </button>
                </div>
                {/* Afficher le message de succès si présent */}
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}
                {/* Afficher le message d'erreur si présent */}
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <div className="sm:col-span-1 min-h-[385px] md:min-h-[685px] sm:my-16 mb-5 flex flex-col items-center justify-center gap-7 backgroundAlreadyRegistred">
          <h2 className="text-3xl text-black font-bold tracking-[-0.5px] text-size32">
            Déjà inscrit ?
          </h2>
          <button onClick={toggle} className="btn btn-transparentDark">
            Se connecter →
          </button>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Register;
