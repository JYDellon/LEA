import React from "react";
import { Formik, Field, Form } from "formik";
import { newsletterSubscription } from './../../api/backend/newsletter';

function NewsletterForm() {
  const initialValues = {
    email: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await newsletterSubscription(values);
  
      if (response.status === 200) {
        console.log('Adresse e-mail inscrite avec succès !');
        resetForm(initialValues); // Réinitialise le formulaire
      } else {
        console.error('Erreur lors de l\'inscription à la newsletter.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => (
        <Form className="flex flex-col gap-2">
          <label htmlFor="newsletter" className="text-md">
            Inscription à la&nbsp;newsletter
          </label>
          <Field
            type="email"
            id="newsletter"
            name="email"
            placeholder="Votre adresse e-mail"
            className="py-1 px-4 border border-gray-300 rounded text-gray-600 mb-3"
          />
          <button
            type="submit"
            className="btn btn-transparent py-1 mt-2 sm:mt-0"
          >
            S'inscrire
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewsletterForm;
