import { put, call } from "redux-saga/effects";

import { toast } from "react-toastify";
import api from "~/services/api";

import history from "~/services/history";

import UserActions from "../ducks/user";

export function* setUser({ user }) {
  yield put(UserActions.setUser(user));
  history.push("/dashboard");
}

export function* updateProfile({ data }) {
  const { name, email, avatar_id, ...rest } = data;
  try {
    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, "users", profile);

    yield put(UserActions.updateProfileSuccess(response.data));

    toast.success("Perfil atualizado com sucesso");
  } catch (error) {
    toast.error("Erro ao atualizar perfil, confira seus dados!");
    yield put(UserActions.updateProfileFailure());
  }
}
