import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import { QRCodeContainerImage } from "./styles";

function QRCodeImage({ qrcodeImage, finalPrice, deliveryTax, qrCode }) {
  return (
    <QRCodeContainerImage>
      <h1>QR Code</h1>
      <img src={qrcodeImage} alt="QR Code" />
      {/* <p>
        Total da compra:{" "}
        <span className="total-price">
          {formatCurrency(finalPrice + deliveryTax)}
        </span>
      </p> */}
    </QRCodeContainerImage>
  );
}

export default QRCodeImage;
