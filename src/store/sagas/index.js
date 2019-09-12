import { all, takeLatest } from "redux-saga/effects";

import { Types as AuthTypes } from "../ducks/auth/reducer";
import { UserTypes } from "../ducks/user";

import { signIn, signUp, setToken, singOut } from "./auth";
import { setUser, updateProfile } from "./user";

export default function* rootSaga() {
  yield all([
    takeLatest("persist/REHYDRATE", setToken),
    takeLatest(AuthTypes.REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_UP, signUp),
    takeLatest(AuthTypes.SUCCESS, setUser),
    takeLatest(AuthTypes.SIGN_OUT, singOut),

    takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, updateProfile)
  ]);
}
