// import styled from 'styled-components'

// import Background from '../../assets/background.svg'

// export const Container = styled.div`
//     height: 100vh;
//     width: 100vw;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     background: url('${Background}');
// `

// export const RegisterImage = styled.img`
//     height: 95%;
// `

// export const ContainerItens = styled.div`
//     height: 95%;
//     padding: 1.56rem 4.68rem;
//     background: #373737;
//     border-radius: 0 0.62rem 0.62rem 0;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;

//     form {
//         display: flex;
//         flex-direction: column;
//     }

//     h1 {
//         font-style: normal;
//         font-weight: 500;
//         font-size: 1.5rem;
//         line-height: 1.75rem;
//         color: #ffffff;
//         text-align: center;
//         margin-top: 0.62rem;
//     }

//     img {
//         margin: auto;
//         width: 12.75rem;
//     }
// `

// export const Label = styled.p`
//     font-style: normal;
//     font-weight: 500;
//     font-size: 0.75rem;
//     line-height: 0.87rem;
//     color: #ffffff;
//     margin-top: ${props => (props.error ? '0.60rem' : '1.60rem')};
//     margin-bottom: 0.31rem;
// `

// export const Input = styled.input`
//     width: 24.464rem;
//     height: 2.395rem;
//     background: #ffffff;
//     box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
//     border-radius: 0.31rem;
//     border: ${props => (props.error ? '0.12rem solid #CC1717' : 'none')};
//     padding-left: 0.62rem;
// `

// export const SignInLink = styled.p`
//     font-style: normal;
//     font-weight: 300;
//     font-size: 0.87rem;
//     line-height: 1rem;
//     color: #ffffff;

//     a {
//         cursor: pointer;
//         text-decoration: underline;
//     }
// // `

// import styled from "styled-components";

// import Background from "../../assets/fundo.jpg";

// export const Container = styled.div`
//   background: url("${Background}");
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100vw;
//   height: 100vh;
// `;

// export const RegisterImage = styled.img`
//   height: 95%;
// `;

// export const LoginImage = styled.img`
//   height: 80%;
// `;

// export const ContainerItens = styled.div`
//   height: 90%;
//   background: #373737;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   margin-top: -50px;

//   h1 {
//     font-style: normal;
//     font-weight: 500;
//     font-size: 1.5rem;
//     line-height: 1.75rem;
//     color: #ffffff;
//     text-align: center;
//     margin-top: 30px;
//   }

//   img {
//     margin-left: 80px;
//     width: 11.75rem;
//   }
// `;

// export const Label = styled.p`
//   font-style: normal;
//   font-weight: 500;
//   font-size: 0.75rem;
//   line-height: 0.87rem;
//   color: #ffffff;
//   margin-top: 1.75rem;
//   margin-bottom: 0.31rem;
//   margin-left: 10px;
// `;

// export const Input = styled.input`
//   width: 20.464rem;
//   height: 2.395rem;
//   background: #ffffff;
//   box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
//   border-radius: 0.31rem;
//   border: ${(props) => (props.error ? "0.12rem solid #CC1717" : "none")};

//   margin-left: 10px; /* Ajuste o valor da margem direita conforme necessário */
//   margin-right: 10px;
// `;

// export const ButtonLogin = styled.button`
//   width: 11.426rem;
//   height: 3rem;
//   background: #f0c137;
//   border-radius: 1.25rem;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 1rem;
//   border: none;
//   color: #ffffff;
//   margin-left: 80px;
//   margin-top: -40%;
// `;

// export const SignInLink = styled.p`
//   font-style: normal;
//   font-weight: 300;
//   font-size: 0.87rem;
//   line-height: 1rem;
//   color: #ffffff;
//   margin-left: 10px;

//   a {
//     cursor: pointer;
//     text-decoration: underline;
//   }
// `;

// export const ErrorYup = styled.p`
//   font-style: normal;
//   font-weight: normal;
//   font-size: 0.87rem;
//   line-height: 1rem;

//   color: #cc1717;
//   margin-top: 0.12rem;
//   margin-left: 10px;
// `;

import styled from "styled-components";

import Background from "../../assets/fundo.jpg";

export const Container = styled.div`
  background: url("${Background}");
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`;

export const LoginImage = styled.img`
  height: 10%;
`;

export const ContainerItens = styled.div`
  background: #373737;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Adicione esta linha para centralizar verticalmente */

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.75rem;
    color: #ffffff;
    text-align: center;
  }

  img {
    width: 30vh;
    margin-top: 10px; /* Reduzi o espaço superior */
  }
`;

export const Label = styled.p`
  font-style: normal;
  font-weight: bold;
  line-height: 0.87rem;
  color: #ffffff;
  margin-top: 1.75rem;
  margin-bottom: 0.31rem;
  margin: 10px;
`;

export const Input = styled.input`
  width: 20.464rem;
  height: 2.395rem;
  background: #ffffff;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  border-radius: 0.31rem;
  border: ${(props) => (props.error ? "0.12rem solid #CC1717" : "none")};
  margin: 10px;
`;

export const ButtonLogin = styled.button`
  width: 100%;
  height: auto; /* Altere a altura para "auto" para que ela se ajuste ao conteúdo interno */
  padding: 1rem; /* Adicione um preenchimento interno para dar espaço ao botão */
  background: #000;
  border-radius: 1.25rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  color: #ffffff;
  margin-top: 3px; /* Reduzi o espaço superior */
`;

export const SignInLink = styled.p`
  font-style: normal;
  font-weight: bold;
  line-height: 1rem;
  color: #ffffff;
  margin-right: 45%;
  margin-bottom: 5%;
`;

export const ErrorYup = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 0.87rem;
  line-height: 1rem;
  color: #cc1717;
  margin-top: 0.12rem;
  margin-left: 10px;
`;
