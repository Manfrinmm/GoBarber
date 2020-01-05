import React from "react";

import { Wrapper, Content } from "./styles";

import Warn from "~/components/Warn";

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Warn />

      <Content>{children}</Content>
    </Wrapper>
  );
}
