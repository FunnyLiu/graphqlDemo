import React from "react";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar } from '../cache';

import { LoginForm, Loading } from "../components";
import * as LoginTypes from "./__generated__/login";

export const LOGIN_USER = gql`
  # 这里 会调用到[resolver中的mutation中](https://github.com/FunnyLiu/graphqlDemo/blob/readsource/fullstack-tutorial/start/server/src/resolvers.js#L34)
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;

export default function Login() {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem("token", login.token as string);
        localStorage.setItem("userId", login.id as string);
        isLoggedInVar(true);
      }
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
