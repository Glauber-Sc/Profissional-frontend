import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useCart } from "../../hooks/CartContext";

import api from "../../services/api";
import apiPort4000 from "../../services/apiPix";

import formatCurrency from "../../utils/formatCurrency";
import { Button } from "../Button";

import axios from "axios";

import Modal from "react-modal";
import QRCodeImage from "../QRCodeImage";
import QRCode from "../QRCode";
import { useUser } from "../../hooks/UserContext";

import {
  Container,
  ContainerEndereco,
  InputAddress,
  ErrorEndereco,
} from "./styles";
import { ErrorMessage } from "../ErrorMessage";
import { useHistory } from "react-router-dom";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const schema = Yup.object().shape({
  street: Yup.string().required("Digite seu endereço. Campo obrigatório***"),
});

const saveAddress = async (address) => {
  try {
    const response = await api.post("addresses", address);
    return response.data.id;
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao salvar o endereço no servidor");
  }
};

// Modal.setAppElement("#root"); // Defina o elemento principal da aplicação

export function CartResume() {
  const [finalPrice, setFinalPrice] = useState(0);
  //const [deliveryTax] = useState(5);
  const [deliveryTax] = useState(0);
  const { cartProducts, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { push } = useHistory();
  const { userData } = useUser();
  const history = useHistory(); // Inicialize useHistory

  //const qrCodeUrl = "http://192.168.100.7:4000/pix"; // Substitua pela URL correta

  const [address, setAddress] = useState("");
  const [qrcodeImage, setQrCodeImage] = useState(""); // Estado para armazenar a URL da imagem do QR Code
  const [qrcode, setQrCode] = useState(""); // Estado para armazenar a URL do QR Code

  const [totalPrice, setTotalPrice] = useState(0); // Estado para armazenar o valor total da compra

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para armazenar a mensagem de sucesso
  const [modalMessage, setModalMessage] = useState("Realizando seu pedido..."); // Mensagem padrão do modal

  const openModal = () => {
    setIsModalOpen(true);
    setModalMessage("Realizando seu pedido..."); // Define a mensagem ao abrir o modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSuccessMessage("Pedido realizado com sucesso!"); // Define a mensagem de sucesso quando o modal é fechado
    push("/");
    clearCart();
  };

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);

    setFinalPrice(sumAllItems);
  }, [cartProducts, deliveryTax]);

  const submitOrder = async () => {
    const order = cartProducts.map((product) => {
      return { id: product.id, quantity: product.quantity };
    });
  
    let responseOrder;
    let txid; // Declara a variável txid
  
    try {
      const responsePix = await apiPort4000.post("/pix", {
        valor: (finalPrice + deliveryTax).toFixed(2),
        nome: userData?.name,
      });
  
      console.log("AQUI ESTA O RESPONSE DO API PIX", responsePix);
  
      if (responsePix.data && responsePix.data.txid) {
        txid = responsePix.data.txid; // Obtém o txid
  
        setQrCodeImage(responsePix.data.qrcodeImage);
        setQrCode(responsePix.data.qrcode);
  
        const addressData = {
          street: address,
        };
        const address_id = await saveAddress(addressData);
  
        responseOrder = await api.post("orders", {
          products: order,
          address_id: address_id,
          txid: txid, // Inclua o txid na solicitação do pedido
        });
        console.log("RESPONSE DO ORDER", responseOrder);
      }
  
      if (responseOrder && responseOrder.data) {
        openModal();
      } else {
        throw new Error("Erro na resposta da API");
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao tentar realizar o seu pedido, tente novamente!");
    }
  };
  

  return (
    <div>
      {/* <div>
        <p>Nome: {userData?.name}</p>
        <p>Email: {userData?.email}</p>
      </div> */}

      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatCurrency(finalPrice)}</p>
          <p className="delivery-tax">Taxa de entrega</p>
          <p className="delivery-tax-price">{formatCurrency(deliveryTax)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatCurrency(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
      <ContainerEndereco className="mt-10">
        <form noValidate onSubmit={handleSubmit(submitOrder)}>
          <div>
            <p className="endereco">Endereço</p>
            <InputAddress
              className="input"
              placeholder="Digite seu endereço."
              {...register("street")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.street && (
              <ErrorEndereco>{errors.street.message}</ErrorEndereco>
            )}
            <Button
              style={{ width: "100%", marginTop: 30 }}
              type="submit"
              //   disabled={!address}
            >
              Finalizar pedido
            </Button>
          </div>
        </form>
      </ContainerEndereco>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage} // Utiliza a mensagem definida no estado do modal
      >
        {qrcodeImage && <QRCodeImage qrcodeImage={qrcodeImage} />}
        {qrcode && (
          <QRCode
            qrcode={qrcode}
            finalPrice={finalPrice}
            deliveryTax={deliveryTax}
          />
        )}

        <Button onClick={closeModal}>Finalizar</Button>
      </Modal>
    </div>
  );
}
