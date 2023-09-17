import styled from "styled-components";

export const QRCodeContainerImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  h1 {
    font-size: 24px;
    color: #000000; /* Cor preta */
    margin-bottom: 10px;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border: 5px solid #F0C137; /* Cor amarela */
    border-radius: 10px;
  }

  
`;