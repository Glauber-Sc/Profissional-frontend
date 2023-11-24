import styled from "styled-components";
//import { Container } from './../../containers/Products/styles';
import { Button } from "./../Button/index";

export const Container = styled.div`
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .container-top {
    display: grid;
    grid-gap: 10px 50px;
    grid-template-areas:
      "title title"
      "items items-price"
      "delivery-tax delivery-tax-price";
      justify-content: space-between;


    .title {
      grid-area: title;
      margin-bottom: 20px;
    }

    .items {
      grid-area: items;
    }

    .items-price {
      grid-area: items-price;
      justify-content: space-between;
      
    }

    .delivery-tax {
      grid-area: delivery-tax;
    }

    .delivery-tax-price {
      grid-area: delivery-tax-price;
    }
  }

  .container-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 24px;
    margin-top: 50px;
  }
`;

export const ContainerAddress = styled.div`
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  min-width: 100px;

  .endereco {
    font-size: 20px;
    margin-left: 10px;
  }

  .textarea {
    margin-top: 5px;
    display: flex;
    width: max-content;
    height: 50px;
  }
`;



export const InputAddress = styled.textarea`
  width: 340px; /* Largura fixa */
  height: 50px; /* Altura fixa */
  background: #ffffff;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  border-radius: 8px;
  border: ${(props) => (props.error ? "2px solid #CC1717" : "2px solid #ccc")};
  resize: none; /* Impede o redimensionamento do input */

  margin: 10px; /* Espaçamento em todos os lados para ficar confortável */
  padding: 10px; /* Espaçamento interno para melhor aparência */
  font-size: 16px; /* Tamanho da fonte */
  color: #333; /* Cor do texto */

  &:focus {
    outline: none;
    border-color: #F0C137; /* Cor da borda quando o input está em foco */
    box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.5); /* Sombra mais intensa quando o input está em foco */
  }

  /* Estilização para placeholder */
  &::placeholder {
    color: #999; /* Cor do placeholder */
  }
`;



export const ContainerPhone = styled.div`
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  min-width: 100px;

  .endereco {
    font-size: 20px;
    margin-left: 10px;
  }

  .textarea {
    margin-top: 5px;
    display: flex;
    width: max-content;
    height: 60px;
  }
`;


export const ContainerPayment = styled.div`
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  min-width: 100px;


`;


export const ContainerButton = styled.div`
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  min-width: 100px;


`;


export const InputPhone = styled.textarea`
  width: 340px; /* Largura fixa */
  height: 50px; /* Altura fixa */
  background: #ffffff;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  border-radius: 8px;
  border: ${(props) => (props.error ? "2px solid #CC1717" : "2px solid #ccc")};
  resize: none; /* Impede o redimensionamento do input */

  margin: 10px; /* Espaçamento em todos os lados para ficar confortável */
  padding: 10px; /* Espaçamento interno para melhor aparência */
  font-size: 16px; /* Tamanho da fonte */
  color: #333; /* Cor do texto */

  &:focus {
    outline: none;
    border-color: #F0C137; /* Cor da borda quando o input está em foco */
    box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.5); /* Sombra mais intensa quando o input está em foco */
  }

  /* Estilização para placeholder */
  &::placeholder {
    color: #999; /* Cor do placeholder */
  }
`;




export const ErrorEndereco = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1rem;
    margin-left: 10px;
    color: #cc1717;
    margin-top: 0.12rem;
`


export const ErrorPayment = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;

    color: #cc1717;
    margin-top: 10px;
`