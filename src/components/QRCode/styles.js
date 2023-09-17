import styled from "styled-components";

export const QRCodeContainerCode = styled.div`
  margin-top: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    justify-items: center;
    align-items: center;
  }

  div {
    border: 4px solid #f0c137; /* Cor amarela */
    border-radius: 10px;
    display: flex;
    cursor: pointer;
    justify-items: center;
    align-items: center;

    p {
      font-family: monospace;
      padding: 8px;

      overflow-wrap: break-word;
      word-wrap: break-word;
      font-size: 20px;
      color: #000000; /* Cor preta */

      font-weight: bold;
      cursor: pointer;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    icon {
      justify-items: center;
      align-items: center;
    }
  }

  p {
    font-size: 30px;
     /* Estilização do valor total da compra */
  }
  /* posso ou nao deixar como H2 */
  h2 {
    font-size: 20px;
    color: #000000; /* Cor preta */
    margin-top: 10px;

    /* Estilização do valor total da compra */
  }

  span.total-price {
    font-size: 35px;
    font-weight: bold;
  }

`;
