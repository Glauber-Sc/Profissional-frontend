import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import React from "react";
import { useHistory } from "react-router-dom";

import Cart from "../../assets/cart.svg";
import User from "../../assets/user.svg";
import { useUser } from "../../hooks/UserContext";
import {
  Container,
  ContainerLeft,
  PageLink,
  ContainerRight,
  Line,
  PageLinkExit,
  ContainerText,
  AdminLink,
  ContainerAdmin,
} from "./styles";

export function Header() {
  const { logout, userData } = useUser();
  console.log(userData);

  // Navegações do botões
  const {
    push,
    location: { pathname },
  } = useHistory();

  // Quando essa função for chamada, ela vai deslogar o usuario e redireciona-lo para tela de login
  const logoutUser = () => {
    logout();
    push("/login");
  };

  return (
    <Container>
      <ContainerLeft>
        <PageLink onClick={() => push("/")} isActive={pathname === "/"}>
          Início
        </PageLink>

        <PageLink
          style={{ marginLeft: "5px" }}
          onClick={() => push("/produtos")}
          isActive={pathname.includes("/produtos")}
        >
          Produtos
        </PageLink>

        <PageLink
          style={{ marginLeft: "5px" }}
          onClick={() => push("/order-tracking")}
          isActive={pathname.includes("/order-tracking")}
        >
          Pedidos
        </PageLink>


      </ContainerLeft>

      <ContainerRight>
        <PageLink onClick={() => push("/carrinho")}>
          <img src={Cart} alt="icone-carrinho" />
        </PageLink>

        <Line></Line>

        <ContainerText>
          <PageLink>
            <img src={User} alt="icone-usuario" />
          </PageLink>
          <div>
            <p>Olá, {userData.name}</p>
            <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
          </div>
        </ContainerText>
        {userData.admin && (
          <ContainerAdmin>
            <AdminPanelSettingsIcon />
            <AdminLink
              onClick={() => push("/pedidos")}
              adminActive={userData.admin}
            >
              Admin
            </AdminLink>
          </ContainerAdmin>
        )}
      </ContainerRight>
    </Container>
  );
}
