import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";
import ConfirmEmail from "../components/account/ConfirmEmail";
import ConfirmReset from "../components/account/ConfirmReset";

// Constants
import { ROLE_ADMIN } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";

// Views
import AdminView from "../views/AdminView";
import HomeView from "../views/HomeView";
import AuthFormView from "../views/AuthFormView";
import ForgotPasswordView from "../views/ForgotPasswordView";
import ForgotPasswordEmailSentView from "../views/ForgotPasswordEmailSentView";
import MyAccountView from "../views/MyAccountView";
import ReturnItemView from "../views/ReturnItemView";
import MyOrdersView from "../views/MyOrdersView";
import ContactView from "../views/ContactView";

// Components
import { FormValidationProvider } from "../components/account/FormValidationContext";
import { PrivateRoute } from "./PrivateRoute";
import UsersList from "../components/account/Admin/UsersList/UsersList";
import Profile from "../components/account/Admin/Profile/Profile";
import ProductsList from "../components/account/Admin/Products/ProductsList";
import ProductsType from "../components/account/Admin/Products/ProductsType";
/**
 * Routes of the application
 * with public and private route
 */

const Routes = () => {
  return (
    <FormValidationProvider>
      <RoutesContainer>
        {/* Public Routes */}
        <Route path={URL.URL_HOME} element={<HomeView />} />
        <Route path={URL.URL_CONTACT} element={<ContactView />} />

        {/* Auth Routes */}
        <Route path={URL.URL_AUTHFORM} element={<AuthFormView />} />
        <Route path="/authentification/login" element={<AuthFormView />} />
        <Route path="/authentification/register" element={<AuthFormView />} />

        <Route path="/confirmer-email" element={<ConfirmEmail />} />
        <Route path="/confirm-reset" element={<ConfirmReset />} />
        <Route path={URL.URL_FORGOT_PASSWORD} element={<ForgotPasswordView />} />
        <Route path={URL.URL_FORGOT_PASSWORD_EMAIL_SENT} element={<ForgotPasswordEmailSentView />} />

        {/* Private Routes */}
        {/* ADMIN*/}
        <Route path={URL.URL_ADMIN} element={<PrivateRoute roles={[ROLE_ADMIN]}><AdminView /></PrivateRoute>} >
          <Route path={URL.URL_USERSLIST} element={<PrivateRoute roles={[ROLE_ADMIN]}><UsersList /></PrivateRoute>} />
          <Route path={URL.URL_ADMIN_DASHBOARD} element={<PrivateRoute roles={[ROLE_ADMIN]}><Profile /></PrivateRoute>} />
          <Route path={URL.URL_PRODUCTSLIST} element={<PrivateRoute roles={[ROLE_ADMIN]}><ProductsList /></PrivateRoute>} />
          <Route path={URL.URL_PRODUCTSTYPE} element={<PrivateRoute roles={[ROLE_ADMIN]}><ProductsType /></PrivateRoute>} />
        </Route>

        {/* UTILISATEURS*/}
        <Route path={URL.URL_MY_ACCOUNT} element={<PrivateRoute><MyAccountView /></PrivateRoute>} />
        <Route path={URL.URL_MY_ORDERS} element={<PrivateRoute><MyOrdersView /></PrivateRoute>} />
        <Route path={URL.URL_RETURN_ITEM} element={<PrivateRoute><ReturnItemView /></PrivateRoute>} />
      </RoutesContainer>
    </FormValidationProvider>
  );
};

export default Routes;
