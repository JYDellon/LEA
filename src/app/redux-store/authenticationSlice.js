import { createSlice } from "@reduxjs/toolkit";
import {
  getPayloadToken,
  isTokenValid,
  setToken,
} from "./..//services/tokenServices";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      try {
        const token = action.payload;
        state.token = token;
        const claims = getPayloadToken(token);

        if (!claims) {
          throw new Error("Invalid token");
        }

        const user = {
          username: claims.sub,
          roles: claims.roles,
        };

        state.user = user;
        state.isAuthenticated = isTokenValid(token);
        setToken(action.payload);
      } catch (error) {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      }
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Supprimez le token du localStorage
    },
  },
});

export const { signIn, signOut } = authenticationSlice.actions;

export const selectIsLogged = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectHasRole = (state, desiredRoles) => {
  if (!desiredRoles || desiredRoles.length === 0) return true;

  const user = state.auth.user;
  if (!user?.roles || !Array.isArray(user.roles)) return false;

  return user.roles.some((role) => desiredRoles.includes(role));
};

export default authenticationSlice.reducer;
