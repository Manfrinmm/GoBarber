import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import produce from "immer";

import { Types as AuthTypes } from "./auth/reducer";
/* Types & Action Creators */

const { Types, Creators } = createActions({
  setUser: ["user"],
  updateProfileRequest: ["data"],
  updateProfileSuccess: ["profile"],
  updateProfileFailure: null
});

export const UserTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  profile: null
};

/* Reducers */

export const userLogged = (state, { user }) => {
  return produce(state, draft => {
    draft.profile = user;
  });
};

export const updateSuccess = (state, { profile }) => {
  return produce(state, draft => {
    draft.profile = profile;
  });
};

export const logout = state => {
  return produce(state, draft => {
    draft.profile = null;
  });
};
/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: userLogged,
  [Types.UPDATE_PROFILE_SUCCESS]: updateSuccess,
  [AuthTypes.SIGN_OUT]: logout
});
