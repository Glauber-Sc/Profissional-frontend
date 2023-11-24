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

import IconButton from "@mui/material/IconButton"; // Importe o IconButton do Material-UI
import MyLocation from "@mui/icons-material/MyLocation"; // Importe o ícone de pesquisa

import {
  Container,
  ContainerAddress,
  InputAddress,
  ErrorEndereco,
  ErrorPayment,
  ContainerPhone,
  InputPhone,
  ContainerPayment,
  ContainerButton,
} from "./styles";
import { ErrorMessage } from "../ErrorMessage";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const schema = Yup.object().shape({
  street: Yup.string().required("Digite seu endereço"),
  phone: Yup.string()
    .required("Digite seu telefone")
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O telefone deve seguir o formato (XX) XXXXX-XXXX"
    ),
  //payment: Yup.string().required("Escolha a forma de pagamento"),
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
  const [phone, setPhone] = useState("");
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
    
    const selectedPayment = document.querySelector(
      'input[name="example-payment-channel"]:checked'
    ).value;

    if (selectedPayment !== "Pix") {
      // Se a forma de pagamento não for "Pix", não faz nada
      return openModal();
    }

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
          phone: phone,
        };
        const address_id = await saveAddress(addressData);

        responseOrder = await api.post("orders", {
          products: order,
          address_id: address_id,
          txid: txid, // Inclua o txid na solicitação do pedido
          phone: phone,
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

      <form noValidate onSubmit={handleSubmit(submitOrder)}>
        <div>
          <ContainerAddress className="mt-10">
            <h2 className="endereco">Endereço</h2>
            <InputAddress
              className="input"
              placeholder="Ex:.Rua, Nº , Bairro"
              {...register("street")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.street && (
              <ErrorEndereco>{errors.street.message}</ErrorEndereco>
            )}
          </ContainerAddress>

          <ContainerPhone>
            <h2 className="endereco">Contato</h2>
            <InputPhone
              className="input"
              placeholder="Ex:.(00) 00000-0000"
              {...register("phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <ErrorEndereco>{errors.phone.message}</ErrorEndereco>
            )}
          </ContainerPhone>

          <ContainerPayment>
            <Box>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  id="example-payment-channel-label"
                  variant="h6"
                  color="black"
                  fontWeight="bold"
                >
                  Forma de Pagamento
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(event) =>
                        setOrientation(
                          event.target.checked ? "horizontal" : "vertical"
                        )
                      }
                      style={{ color: "#F0C137" }} // Defina a cor de fundo desejada
                    />
                  }
                  label="Linha"
                />
              </Box>
              <RadioGroup
                aria-labelledby="example-payment-channel-label"
                name="example-payment-channel"
                defaultValue="Pix"
              >
                <List
                  component="div"
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {["Pix", "Dinheiro", "Debito/Credito"].map((value, index) => (
                    <React.Fragment key={value}>
                      {index !== 0 && <Divider />}
                      <ListItem>
                        <Radio
                          value={value}
                          sx={{
                            "&.Mui-checked": {
                              color: "#F0C137", // Altere a cor da bola de seleção quando selecionada
                              borderColor: "#F0C137", // Altere a cor da borda da bola de seleção quando selecionada
                            },
                          }}
                        />
                        <Typography>{value}</Typography>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </RadioGroup>
            </Box>
            {/* {errors.street && (
              <ErrorPayment>{errors.payment.message}</ErrorPayment>
            )} */}
          </ContainerPayment>

          <ContainerButton>
            <Button style={{ width: "100%", outline: "none" }} type="submit">
              Finalizar pedido
            </Button>
          </ContainerButton>
        </div>
      </form>

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

/////////////

// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

// import { useCart } from "../../hooks/CartContext";

// import api from "../../services/api";
// import apiPort4000 from "../../services/apiPix";

// import formatCurrency from "../../utils/formatCurrency";
// import { Button } from "../Button";

// import axios from "axios";

// import Modal from "react-modal";
// import QRCodeImage from "../QRCodeImage";
// import QRCode from "../QRCode";
// import { useUser } from "../../hooks/UserContext";

// import IconButton from "@mui/material/IconButton"; // Importe o IconButton do Material-UI
// import MyLocation from "@mui/icons-material/MyLocation"; // Importe o ícone de pesquisa

// import {
//   Container,
//   ContainerAddress,
//   InputAddress,
//   ErrorEndereco,
//   ErrorPayment,
//   ContainerPhone,
//   InputPhone,
//   ContainerPayment,
//   ContainerButton,
// } from "./styles";
// import { ErrorMessage } from "../ErrorMessage";
// import { useHistory } from "react-router-dom";

// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import Typography from "@mui/material/Typography";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";

// const schema = Yup.object().shape({
//   street: Yup.string().required("Digite seu endereço"),
//   phone: Yup.string()
//     .required("Digite seu telefone")
//     .matches(
//       /^\(\d{2}\) \d{5}-\d{4}$/,
//       "O telefone deve seguir o formato (XX) XXXXX-XXXX"
//     ),
//   //payment: Yup.string().required("Escolha a forma de pagamento"),
// });

// const saveAddress = async (address) => {
//   try {
//     const response = await api.post("addresses", address);
//     return response.data.id;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Falha ao salvar o endereço no servidor");
//   }
// };

// // Modal.setAppElement("#root"); // Defina o elemento principal da aplicação

// export function CartResume() {
//   const [finalPrice, setFinalPrice] = useState(0);
//   //const [deliveryTax] = useState(5);
//   const [deliveryTax] = useState(0);
//   const { cartProducts, clearCart } = useCart();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const { push } = useHistory();
//   const { userData } = useUser();
//   const history = useHistory(); // Inicialize useHistory

//   //const qrCodeUrl = "http://192.168.100.7:4000/pix"; // Substitua pela URL correta

//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [qrcodeImage, setQrCodeImage] = useState(""); // Estado para armazenar a URL da imagem do QR Code
//   const [qrcode, setQrCode] = useState(""); // Estado para armazenar a URL do QR Code

//   const [totalPrice, setTotalPrice] = useState(0); // Estado para armazenar o valor total da compra

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(""); // Novo estado para armazenar a mensagem de sucesso
//   const [modalMessage, setModalMessage] = useState("Realizando seu pedido..."); // Mensagem padrão do modal

//   const openModal = () => {
//     setIsModalOpen(true);
//     setModalMessage("Realizando seu pedido..."); // Define a mensagem ao abrir o modal
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSuccessMessage("Pedido realizado com sucesso!"); // Define a mensagem de sucesso quando o modal é fechado
//     push("/");
//     clearCart();
//   };

//   useEffect(() => {
//     const sumAllItems = cartProducts.reduce((acc, current) => {
//       return current.price * current.quantity + acc;
//     }, 0);

//     setFinalPrice(sumAllItems);
//   }, [cartProducts, deliveryTax]);

//   const submitOrder = async () => {
//     const selectedPayment = document.querySelector(
//       'input[name="example-payment-channel"]:checked'
//     ).value;

//     if (selectedPayment !== "Pix") {
//       // Se a forma de pagamento não for "Pix", não faz nada
//       return;
//     }

//     // Restante do código para realizar o pedido
//     const order = cartProducts.map((product) => {
//       return { id: product.id, quantity: product.quantity };
//     });

//     let responseOrder;
//     let txid; // Declara a variável txid

//     try {
//       const responsePix = await apiPort4000.post("/pix", {
//         valor: (finalPrice + deliveryTax).toFixed(2),
//         nome: userData?.name,
//       });

//       console.log("AQUI ESTA O RESPONSE DO API PIX", responsePix);

//       if (responsePix.data && responsePix.data.txid) {
//         txid = responsePix.data.txid; // Obtém o txid

//         setQrCodeImage(responsePix.data.qrcodeImage);
//         setQrCode(responsePix.data.qrcode);

//         const addressData = {
//           street: address,
//           phone: phone,
//         };
//         const address_id = await saveAddress(addressData);

//         responseOrder = await api.post("orders", {
//           products: order,
//           address_id: address_id,
//           txid: txid, // Inclua o txid na solicitação do pedido
//           phone: phone,
//         });
//         console.log("RESPONSE DO ORDER", responseOrder);
//       }

//       if (responseOrder && responseOrder.data) {
//         openModal();
//       } else {
//         throw new Error("Erro na resposta da API");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Falha ao tentar realizar o seu pedido, tente novamente!");
//     }
//   };

//   return (
//     <div>
//       <Container>
//         <div className="container-top">
//           <h2 className="title">Resumo do pedido</h2>
//           <p className="items">Itens</p>
//           <p className="items-price">{formatCurrency(finalPrice)}</p>
//           <p className="delivery-tax">Taxa de entrega</p>
//           <p className="delivery-tax-price">{formatCurrency(deliveryTax)}</p>
//         </div>
//         <div className="container-bottom">
//           <p>Total</p>
//           <p>{formatCurrency(finalPrice + deliveryTax)}</p>
//         </div>
//       </Container>

//       <form noValidate onSubmit={handleSubmit(submitOrder)}>
//         <div>
//           <ContainerAddress className="mt-10">
//             <h2 className="endereco">Endereço</h2>
//             <InputAddress
//               className="input"
//               placeholder="Ex:.Rua, Nº , Bairro"
//               {...register("street")}
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//             {errors.street && (
//               <ErrorEndereco>{errors.street.message}</ErrorEndereco>
//             )}
//           </ContainerAddress>

//           <ContainerPhone>
//             <h2 className="endereco">Contato</h2>
//             <InputPhone
//               className="input"
//               placeholder="Ex:.(00) 00000-0000"
//               {...register("phone")}
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             {errors.phone && (
//               <ErrorEndereco>{errors.phone.message}</ErrorEndereco>
//             )}
//           </ContainerPhone>

//           <ContainerPayment>
//             <Box>
//               <Box
//                 sx={{
//                   mb: 2,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   id="example-payment-channel-label"
//                   variant="h6"
//                   color="black"
//                   fontWeight="bold"
//                 >
//                   Forma de Pagamento
//                 </Typography>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       onChange={(event) =>
//                         setOrientation(
//                           event.target.checked ? "horizontal" : "vertical"
//                         )
//                       }
//                       style={{ color: "#F0C137" }} // Defina a cor de fundo desejada
//                     />
//                   }
//                   label="Linha"
//                 />
//               </Box>
//               <RadioGroup
//                 aria-labelledby="example-payment-channel-label"
//                 name="example-payment-channel"
//                 defaultValue="Pix"
//               >
//                 <List
//                   component="div"
//                   variant="outlined"
//                   sx={{
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
//                   }}
//                 >
//                   {["Pix", "Dinheiro", "Debito/Credito"].map((value, index) => (
//                     <React.Fragment key={value}>
//                       {index !== 0 && <Divider />}
//                       <ListItem>
//                         <Radio
//                           value={value}
//                           sx={{
//                             "&.Mui-checked": {
//                               color: "#F0C137", // Altere a cor da bola de seleção quando selecionada
//                               borderColor: "#F0C137", // Altere a cor da borda da bola de seleção quando selecionada
//                             },
//                           }}
//                         />
//                         <Typography>{value}</Typography>
//                       </ListItem>
//                     </React.Fragment>
//                   ))}
//                 </List>
//               </RadioGroup>
//             </Box>
//             {/* {errors.street && (
//               <ErrorPayment>{errors.payment.message}</ErrorPayment>
//             )} */}
//           </ContainerPayment>

//           <ContainerButton>
//             <Button style={{ width: "100%", outline: "none" }} type="submit">
//               Finalizar pedido
//             </Button>
//           </ContainerButton>
//         </div>
//       </form>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         message={modalMessage} // Utiliza a mensagem definida no estado do modal
//       >
//         {qrcodeImage && <QRCodeImage qrcodeImage={qrcodeImage} />}
//         {qrcode && (
//           <QRCode
//             qrcode={qrcode}
//             finalPrice={finalPrice}
//             deliveryTax={deliveryTax}
//           />
//         )}

//         <Button onClick={closeModal}>Finalizar</Button>
//       </Modal>
//     </div>
//   );
// }
