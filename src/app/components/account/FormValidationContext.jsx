// Création d'un contexte où le formulaire de "mot de passe oublié (ForgotPassword.jsx)" doit être validé
//  pour pouvoir accéder à la page "mail envoyé" seulement de cette façon.

import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const FormValidationContext = createContext();

export const FormValidationProvider = ({ children }) => {
  const [isFormValidated, setIsFormValidated] = useState(false);

  // Utilise useMemo pour mémoriser la valeur de l'objet
  const contextValue = useMemo(
    () => ({ isFormValidated, setIsFormValidated }),
    [isFormValidated]
  );

  return (
    <FormValidationContext.Provider value={contextValue}>
      {children}
    </FormValidationContext.Provider>
  );
};

FormValidationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFormValidation = () => {
  return useContext(FormValidationContext);
};
