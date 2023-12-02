import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import PasswordInput from "../../PasswordInput";
import { selectToken } from "../../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import { modifyAccount } from "../../../../api/backend/account";

/**
 * Component Profile
 */

const Profile = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = useSelector(selectToken);

  // Le schéma de validation Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[a-zA-ZÀ-ÿ\s'-]+$/,
        "Le prénom doit contenir uniquement des lettres, des espaces, des tirets et des apostrophes"
      ),
    lastName: Yup.string().matches(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Le nom doit contenir uniquement des lettres, des espaces, des tirets et des apostrophes"
    ),
  });
  // Fonction pour mettre à jour les informations
  const handleUpdate = async (values) => {
    // Efface le message s'il y a
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await modifyAccount(values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Récupère la réponse du serveur
      const result = await response.json();
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
      // Gère les erreurs liées à la requête
      console.error("Erreur de requête:", error.message);
      // Définissez le message d'erreur dans l'état local
      setErrorMessage("Erreur de requête: " + error.message);
    }
  };

  return (
    <div className="md:col-span-3 p-4">
      <div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.5px] text-size32">
          Administration - Tableau de bord
        </h1>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
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
                  placeholder="Prenom"
                  className="input mt-2"
                />
                {errors.firstName && touched.firstName && (
                  <div className="text-red-500">{errors.firstName}</div>
                )}
              </div>
              <PasswordInput
                name="confirmPassword"
                label="Mot de passe actuel"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500">{errors.confirmPassword}</div>
              )}
              <PasswordInput name="password" label="Nouveau mot de passe" />
              {errors.password && touched.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>
            <div>
              <button type="submit" className="btn btn-black mt-5">
                Enregistrer mes modifications →
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
  );
};

export default Profile;
