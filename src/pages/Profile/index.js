import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Form, Input } from "@rocketseat/unform";

import UserActions from "~/store/ducks/user";
import { signOut } from "~/store/ducks/auth/actions";

import AvatarInput from "./AvatarInput";

import { Container } from "./styles";

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(UserActions.updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="confirmação de senha"
        />
        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
