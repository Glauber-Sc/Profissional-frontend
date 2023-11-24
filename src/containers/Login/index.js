import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

// import LoginImg from "../../assets/login-image.svg";
// import Logo from "../../assets/logo.svg";
import { Button, ErrorMessage } from "../../components";
import { useUser } from "../../hooks/UserContext";
import api from "../../services/api";

import MadrugaLogo from "../../assets/Logo_madruga_burguer.png";

import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  ButtonLogin,
  ErrorYup,
} from "./styles";
import { Padding } from "@mui/icons-material";

export function Login() {
  const history = useHistory();
  const { putUserData } = useUser();

  /* Validação do formulario */
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatorio"),
    password: Yup.string()
      .required("A senha é obrigatoria")
      .min(6, "A senha deve ter pelo menos 6 digitos"),
  });

  /* Configuração react-hook-form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /* Acessando a api quando clicar no botão de submit */
  const onSubmit = async (clientData) => {
    const { data } = await toast.promise(
      api.post("sessions", {
        email: clientData.email,
        password: clientData.password,
      }),
      {
        // Adicionando Toast Messages
        pending: "Verificando seus dados",
        success: "Seja bem-vindo(a)",
        error: "Verifique seu e-mail e senha 🤯",
      }
    );

    putUserData(data);
    console.log("AQUI ESTA O LOGIN", data);

    // Esperando 1s para o usuario ver a menssagem e ser redirecionado para a tela de home
    // setTimeout vai executar o que está dentro depois de um determinado tempo
    setTimeout(() => {
      if (data.admin) {
        history.push("/pedidos");
      } else {
        history.push("/");
      }
    }, 1000);
  };

  return (
    <Container>
      <LoginImage
      // src={LoginImg} alt="login-image"
      />
      <ContainerItens>
        <img src={MadrugaLogo} alt="Logo-Magruga" />
        {/* <h1>Login</h1> */}

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <ErrorYup>{errors.email?.message}</ErrorYup>

          <Label>Senha</Label>
          <Input
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <ErrorYup>{errors.password?.message}</ErrorYup>

          <ButtonLogin type="submit">Entrar</ButtonLogin>
        </form>
        <SignInLink>
          Não possui conta?{" "}
          <Link style={{ color: "white" }} to="/cadastro">
            Cadastre-se
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  );
}
