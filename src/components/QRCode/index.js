import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import { QRCodeContainerCode } from "./styles";
import FileCopy from "@mui/icons-material/FileCopy";
import { Button } from "../Button";

function QRCode({ qrcode, finalPrice, deliveryTax }) {
  const copyTextToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <>
      <QRCodeContainerCode>
        <h1>Código do QR Code:</h1>

        <div onClick={() => copyTextToClipboard(qrcode)}>
          <p>{qrcode}</p>

          <icon>
            <FileCopy />
          </icon>
        </div>
        <h2 className="mt-10">Total da compra: </h2>
        <span className="total-price">
          {formatCurrency(finalPrice + deliveryTax)}
        </span>
      </QRCodeContainerCode>

      <p style={{ marginTop: 30, fontSize: 20 }}>
        Mostre o QR Code na sua tela ou copie o codigo para efetuar o pagamento:
      </p>

      <div className="mt-10">
        <Button
          style={{ marginTop: 30, marginBottom: 10 }}
          type="submit"
          onClick={() => copyTextToClipboard(qrcode)}
        >
          Copiar Código
        </Button>
      </div>
    </>
  );
}

export default QRCode;
