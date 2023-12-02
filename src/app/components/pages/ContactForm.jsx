import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { contactForm } from "../../api/backend/contact";

/**
 * Component ContactForm
 */

const ContactForm = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Le schéma de validation Yup
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
      .required("L'adresse e-mail est requise"),

    // phoneNumber: Yup.string()
    //   .matches(
    //     /^\d*$/,
    //     "Le numéro de téléphone doit contenir uniquement des chiffres"
    //   )
    //   .min(10, "Le numéro de téléphone doit comporter au moins 10 chiffres")
    //   .max(15, "Le numéro de téléphone ne doit pas dépasser 15 chiffres"),

    subject: Yup.string().required("Le sujet est requis"),

    message: Yup.string()
      .min(10, "Le message doit comporter au moins 10 caractères")
      .required("Le message est requis"),
  });

  // Fonction pour envoyer le formulaire au serveur
  const handleSubmit = async (values) => {
    // Efface le message s'il y a
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await contactForm(values);

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
      // Gère les erreurs liées à la requête
      console.error("Erreur de requête:", error.message);
      // Définissez le message d'erreur dans l'état local
      setErrorMessage("Erreur de requête: " + error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        // phoneNumber: "",
        subject: "",
        message: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, errors, touched }) => (
        <Form className="relative my-10 space-y-6 p-2 sm:p-0">
          <div className="relative">
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
          </div>{" "}
          {/* <div className="relative mt-5">
            <label htmlFor="phoneNumber">Numéro de téléphone</label>
            <Field
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Numéro de téléphone"
              className="input mt-2"
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <div className="text-red-500">{errors.phoneNumber}</div>
            )}
          </div> */}
          <div className="relative mt-5">
            <label htmlFor="subject">Sujet</label>
            <Field
              as="select"
              id="subject"
              name="subject"
              className="input mt-2"
            >
              <option value="" label="Sélectionnez un sujet" />
              <option value="question" label="Question" />
              <option value="feedback" label="Retour d'information" />
              <option value="other" label="Autre" />
            </Field>
            {errors.subject && touched.subject && (
              <div className="text-red-500">{errors.subject}</div>
            )}
          </div>
          <div className="relative mt-5">
            <label htmlFor="message">Message</label>
            <Field
              as="textarea"
              id="message"
              name="message"
              placeholder="Votre message"
              className="input mt-2"
            />
            {errors.message && touched.message && (
              <div className="text-red-500">{errors.message}</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-black mt-5"
            >
              Valider le formulaire
            </button>
          </div>
          {/* Afficher le message de succès si présent */}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {/* Afficher le message d'erreur si présent */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
