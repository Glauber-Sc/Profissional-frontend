// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { useHistory } from "react-router-dom";
// import apiPort4000 from "../../../services/apiPix";
// import formatCurrency from "../../../utils/formatCurrency";
// import NotificationButton from "../../../components/NotificationButton";
// import { Container } from "./styles";
// import paths from "../../../constants/paths";
// import { registerLocale } from "react-datepicker";
// import ptBR from "date-fns/locale/pt-BR";

// registerLocale("pt-BR", ptBR);

// function Financial() {
//   const [cobrancas, setCobrancas] = useState([]);
//   const [startDate, setStartDate] = useState(
//     new Date(new Date().setDate(new Date().getDate() - 365))
//   );
//   const [endDate, setEndDate] = useState(new Date());
//   const [loading, setLoading] = useState(false);
//   const { push } = useHistory();

//   const loadCobrancas = async () => {
//     try {
//       setLoading(true); // Defina o estado de loading para true
//       const formattedStartDate = startDate.toISOString().slice(0, 10);
//       const formattedEndDate = endDate.toISOString().slice(0, 10);

//       const cobrancasResponse = await apiPort4000.get(
//         `/cobrancas?minDate=${formattedStartDate}&maxDate=${formattedEndDate}`
//       );
//       console.log(cobrancasResponse.data);
//       setCobrancas(cobrancasResponse.data);
//     } catch (error) {
//       console.error("Erro ao carregar cobranças:", error);
//     } finally {
//       setLoading(false); // Defina o estado de loading de volta para false quando a carga estiver concluída
//     }
//   };

//   useEffect(() => {
//     loadCobrancas();
//   }, []); // Certifique-se de que a função seja chamada quando o componente é montado

//   function isOffer(offerStatus) {
//     if (offerStatus) {
//       return <CheckBoxIcon style={{ color: "#228822" }} />;
//     }
//     return <CancelIcon style={{ color: "#CC1717" }} />;
//   }

//   return (
//     <Container>
//       <h2 className="desmeta-sales-title">Cobranças</h2>
//       <div>
//         <div className="listavendas-form-control-container">
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="listavendas-form-control"
//             dateFormat="dd/MM/yyyy"
//             locale="pt-BR"
//           />
//         </div>
//         <div className="listavendas-form-control-container">
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="listavendas-form-control"
//             dateFormat="dd/MM/yyyy"
//             locale="pt-BR"
//           />
//         </div>
//         <button onClick={loadCobrancas}>Buscar Cobranças</button>
//       </div>
//       {loading ? (
//         <p>Carregando...</p>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>TxId</TableCell>
//                 <TableCell>Data</TableCell>
//                 <TableCell>Cliente</TableCell>
//                 <TableCell>Valor</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Notificar</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cobrancas.cobs && cobrancas.cobs.length > 0 ? (
//                 cobrancas.cobs.map((cobs) => (
//                   <TableRow
//                     key={cobs.txid}
//                     sx={{
//                       "&:last-child td, &:last-child th": {
//                         border: 0,
//                       },
//                     }}
//                   >
//                     <TableCell>{cobs.loc.id}</TableCell>
//                     <TableCell>{cobs.txid}</TableCell>
//                     <TableCell>{cobs.calendario.criacao}</TableCell>
//                     <TableCell>{cobs.devedor.nome}</TableCell>
//                     <TableCell>{formatCurrency(cobs.valor.original)}</TableCell>
//                     <TableCell>{cobs.status}</TableCell>
//                     <TableCell>
//                       <NotificationButton saleId={cobs.txid} />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6}>Nenhuma cobrança encontrada.</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Container>
//   );
// }

// export default Financial;






// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { useHistory } from "react-router-dom";
// import apiPort4000 from "../../../services/apiPix";
// import formatCurrency from "../../../utils/formatCurrency";
// import NotificationButton from "../../../components/NotificationButton";
// import { Container } from "./styles";
// import paths from "../../../constants/paths";
// import { registerLocale } from "react-datepicker";
// import ptBR from "date-fns/locale/pt-BR";

// registerLocale("pt-BR", ptBR);

// function Financial() {
//   const [cobrancas, setCobrancas] = useState([]);
//   const [startDate, setStartDate] = useState(
//     new Date(new Date().setDate(new Date().getDate() - 365))
//   );
//   const [endDate, setEndDate] = useState(new Date());
//   const [loading, setLoading] = useState(false);
//   const { push } = useHistory();

//   const loadCobrancas = async () => {
//     try {
//       setLoading(true); // Defina o estado de loading para true
//       const formattedStartDate = startDate.toISOString(); // Use a data de início diretamente
//       const formattedEndDate = endDate.toISOString(); // Use a data de fim diretamente

//       const cobrancasResponse = await apiPort4000.get(
//         `/cobrancas?inicio=${formattedStartDate}&fim=${formattedEndDate}`
//       );
//       console.log(cobrancasResponse.data);
//       setCobrancas(cobrancasResponse.data);
//     } catch (error) {
//       console.error("Erro ao carregar cobranças:", error);
//     } finally {
//       setLoading(false); // Defina o estado de loading de volta para false quando a carga estiver concluída
//     }
//   };

//   useEffect(() => {
//     loadCobrancas();
//   }, []); // Certifique-se de que a função seja chamada quando o componente é montado

//   function isOffer(offerStatus) {
//     if (offerStatus) {
//       return <CheckBoxIcon style={{ color: "#228822" }} />;
//     }
//     return <CancelIcon style={{ color: "#CC1717" }} />;
//   }

//   return (
//     <Container>
//       <h2 className="desmeta-sales-title">Cobranças</h2>
//       <div>
//         <div className="listavendas-form-control-container">
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="listavendas-form-control"
//             dateFormat="dd/MM/yyyy"
//             locale="pt-BR"
//           />
//         </div>
//         <div className="listavendas-form-control-container">
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="listavendas-form-control"
//             dateFormat="dd/MM/yyyy"
//             locale="pt-BR"
//           />
//         </div>
//         <button onClick={loadCobrancas}>Buscar Cobranças</button>
//       </div>
//       {loading ? (
//         <p>Carregando...</p>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>TxId</TableCell>
//                 <TableCell>Data</TableCell>
//                 <TableCell>Cliente</TableCell>
//                 <TableCell>Valor</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Notificar</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cobrancas.cobs && cobrancas.cobs.length > 0 ? (
//                 cobrancas.cobs.map((cobs) => (
//                   <TableRow
//                     key={cobs.txid}
//                     sx={{
//                       "&:last-child td, &:last-child th": {
//                         border: 0,
//                       },
//                     }}
//                   >
//                     <TableCell>{cobs.loc.id}</TableCell>
//                     <TableCell>{cobs.txid}</TableCell>
//                     <TableCell>{cobs.calendario.criacao}</TableCell>
//                     <TableCell>{cobs.devedor.nome}</TableCell>
//                     <TableCell>{formatCurrency(cobs.valor.original)}</TableCell>
//                     <TableCell>{cobs.status}</TableCell>
//                     <TableCell>
//                       <NotificationButton saleId={cobs.txid} />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6}>Nenhuma cobrança encontrada.</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Container>
//   );
// }

// export default Financial;





//CODIGO ADAPTADO PARA BUSCAR POR CRIACAO DE PIX
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import apiPort4000 from "../../../services/apiPix";
import formatCurrency from "../../../utils/formatCurrency";
import NotificationButton from "../../../components/NotificationButton";
import { Container } from "./styles";
import paths from "../../../constants/paths";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

function Financial() {
  const [cobrancas, setCobrancas] = useState([]);
  const [searchDate, setSearchDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Função para buscar as transações PIX com base na data de criação
  const loadPixTransactions = async () => {
    try {
      setLoading(true);
      const formattedSearchDate = searchDate.toISOString(); // Use a data de pesquisa formatada

      const pixTransactionsResponse = await apiPort4000.get(
        `/pix?data=${formattedSearchDate}` // Ajuste o nome do parâmetro se necessário
      );

      console.log(pixTransactionsResponse.data);
      setCobrancas(pixTransactionsResponse.data);
    } catch (error) {
      console.error("Erro ao carregar transações PIX:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPixTransactions();
  }, []); // Certifique-se de que a função seja chamada quando o componente é montado

  function isOffer(offerStatus) {
    if (offerStatus) {
      return <CheckBoxIcon style={{ color: "#228822" }} />;
    }
    return <CancelIcon style={{ color: "#CC1717" }} />;
  }

  return (
    <Container>
      <h2 className="desmeta-sales-title">Cobranças</h2>
      <div>
        <div className="listavendas-form-control-container">
          <DatePicker
            selected={searchDate}
            onChange={(date) => setSearchDate(date)}
            className="listavendas-form-control"
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
          />
        </div>
        <button onClick={loadPixTransactions}>Buscar Cobranças</button>
      </div>
      {/* Aqui você pode renderizar a lista de transações PIX */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
              <TableCell>ID</TableCell> {/* Exiba o ID aqui */}
                <TableCell>txid</TableCell>
                <TableCell>nome</TableCell>
                <TableCell>valor</TableCell>
                {/* <TableCell>qrcode</TableCell> */}
                {/* <TableCell>expiracao</TableCell> */}
                <TableCell>Notificar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cobrancas.map((cobranca) => (
                <TableRow
                  key={cobranca.txid}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                <TableCell>{cobranca.id}</TableCell> {/* Exiba o ID aqui */}
                  <TableCell>{cobranca.txid}</TableCell>
                  <TableCell>{cobranca.nome}</TableCell>
                  <TableCell>{cobranca.valor}</TableCell>
                  {/* <TableCell>{cobranca.qrcode}</TableCell> */}
                  {/* <TableCell>{cobranca.expiracao}</TableCell> */}
                  {/* Preencha os outros campos de acordo com a estrutura de dados */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Financial;
