// // import React, { useEffect, useState } from 'react';
// // import api from './api'; // Importe sua API

// // function OrderTrackingPage() {
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     // Recupere os pedidos do cliente (substitua pelo código real)
// //     api.get('/customer/orders')
// //       .then((response) => {
// //         setOrders(response.data);
// //       })
// //       .catch((error) => {
// //         console.error('Erro ao recuperar pedidos', error);
// //       });
// //   }, []);

// //   // Função para atualizar o status do pedido (usando sua função setNewStatus)

// //   return (
// //     <div>
// //       <h1>Acompanhamento de Pedidos</h1>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Pedido</th>
// //             <th>Nome</th>
// //             <th>Data</th>
// //             <th>Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orders.map((order) => (
// //             <tr key={order.orderId}>
// //               <td>{order.orderId}</td>
// //               <td>{order.name}</td>
// //               <td>{order.date}</td>
// //               <td>
// //                 {/* Exiba o status atual e permita atualização, se necessário */}
// //                 {order.status}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// export default OrderTrackingPage;



// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
// } from '@mui/material';
// import api from "../../services/api";
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';


// export function OrderTracking() {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadOrders() {
//       try {
//         const response = await api.get('/orders/client'); // Certifique-se de usar a rota correta para os pedidos do cliente
//         const data = response.data;
//         setOrders(data);
//       } catch (error) {
//         console.error('Erro ao carregar dados da API:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadOrders();
//   }, []);

  
//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Acompanhamento de Pedidos
//       </Typography>
//       {isLoading ? (
//         <p>Carregando pedidos...</p>
//       ) : (
//         <div>
//           {orders.map((order) => (
//             <Paper key={order._id} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
//               <Typography variant="h6">Pedido {order._id}</Typography>
//               <Typography>Data: {order.createdAt}</Typography>
//               <Typography>Endereço de Entrega: {order.address.street}</Typography>
//               <Typography>Status: {order.status}</Typography>

//               {/* Adicione a linha do tempo de status aqui */}
//               <Timeline order={order} />
//             </Paper>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Componente da linha do tempo
// function Timeline({ order }) {

//   const statusColors = {
//     "Em andamento": "green",
//     "Pendente": "yellow",
//     "Entregue": "blue",
//     // Adicione outras cores e estados de status conforme necessário
//   };
  
//   return (
//     <VerticalTimeline>
//       <VerticalTimelineElement
//         className="vertical-timeline-element--work"
//         contentStyle={{ background: statusColors[order.status], color: '#fff' }}
//         contentArrowStyle={{ borderRight: `7px solid ${statusColors[order.status]}` }}
//         date={order.createdAt} // Use a data real do pedido
//         iconStyle={{ background: statusColors[order.status], color: '#fff' }}
//         icon={<i className="fas fa-check-circle"></i>} // Ícone apropriado
//       >
//         <h3 className="vertical-timeline-element-title">{order.status}</h3>
//       </VerticalTimelineElement>
//     </VerticalTimeline>
//   );
// }

// export default OrderTracking;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress, // Adicionando um indicador de carregamento
} from '@mui/material';

import api from "../../services/api";

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  tableContainer: {
    marginTop: '20px',
  },
};

export function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        // Faça a chamada para a API com autenticação
        const response = await api.get('/orders/client'); // Certifique-se de usar a rota correta para os pedidos do cliente
        const data = response.data;
        console.log('Dados da API:', data);
        setOrders(data);
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
        // Trate o erro de acordo com sua necessidade
      } finally {
        setIsLoading(false); // Indique que a carga dos pedidos foi concluída, independentemente do sucesso ou falha
      }
    }
    loadOrders();
  }, []); // O array vazio [] garante que o efeito só será executado após a montagem inicial do componente

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Acompanhe seus Pedidos
      </Typography>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress /> {/* Indicador de carregamento */}
          <p>Carregando pedidos...</p>
        </div>
      ) : (
        <TableContainer component={Paper} style={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número do Pedido</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Endereço de Entrega</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{order.address.street}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default OrderTracking;
