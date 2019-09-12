import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "~/services/api";
import history from "~/services/history";

import { signInSuccess, signFailure } from "../ducks/auth/actions";

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

export function* signIn({ email, password }) {
  try {
    const { data } = yield call(api.post, "sessions", {
      email,
      password
    });

    const { token, user } = data;

    if (!user.provider) {
      toast.error("Usuário não é um provider");
      return;
    }

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    // history.push("/dashboard");
  } catch (error) {
    toast.error("Falha na autenticação, verifique seus dados!");
    yield put(signFailure());
  }
}

export function* signUp({ name, email, password }) {
  try {
    yield call(api.post, "users", {
      name,
      email,
      password,
      provider: true
    });

    history.push("/");
  } catch (error) {
    toast.error("Falha no cadastro, verifique seus dados!");

    yield put(signFailure());
  }
}

export function singOut() {
  history.push("/");
}
