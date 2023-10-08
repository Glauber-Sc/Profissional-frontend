import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import formatDate from '../../../utils/formatDate';
import status from './order-status';
import Row from './row';
import { Container, Menu, LinkMenu } from './styles';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(1);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('orders');
        setOrders(data || []);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    }

    loadOrders();
  }, []);

  // Função do filtro do menu de seleção de status
  function handleStatus(status) {
    setActiveStatus(status.id);
  }

  return (
    <Container>
      <Menu>
        {status &&
          status.map((statusItem) => (
            <LinkMenu
              key={statusItem.id}
              onClick={() => handleStatus(statusItem)}
              isActiveStatus={activeStatus === statusItem.id}
            >
              {statusItem.label}
            </LinkMenu>
          ))}
      </Menu>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: '#565656' }}>
            <TableRow>
              <TableCell />
              <TableCell style={{ color: 'white' }}>Pedido</TableCell>
              <TableCell style={{ color: 'white' }}>Cliente</TableCell>
              <TableCell style={{ color: 'white' }}>Data do Pedido</TableCell>
              <TableCell style={{ color: 'white' }}>Endereço</TableCell>
              <TableCell style={{ color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <Row
                key={order._id} // Use uma identificação única aqui
                row={order}
                setOrders={setOrders}
                orders={orders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;
