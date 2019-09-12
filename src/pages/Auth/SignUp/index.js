import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import logo from "~/assets/logo.svg";

import { singUpRequest } from "~/store/ducks/auth/actions";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatório")
    .min(3, "A senha precisa ter 3 caracteres no minimo")
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(singUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Digite seu nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button type="submit">Criar</button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}
