import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";

import api from "../../../services/api";
import formatDate from "../../../utils/formatDate";
import status from "./order-status";
import Row from "./row";
import { Container, Menu, LinkMenu } from "./styles";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(1);
  const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   // Carregando menu de categorias
  //   async function loadOrders() {
  //     const data = await api.get("orders");
  //     console.log("AAAAAAAAAAAAAAA", data);
  //     setOrders(data);
  //     setFilteredOrders(data);
  //   }

  //   loadOrders();
  // }, []);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get("orders");
        const data = response.data; // Certifique-se de que os dados estejam na propriedade "data"
        console.log("Dados da API:", data);
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("Erro ao carregar dados da API:", error);
        // Trate o erro de acordo com sua necessidade
      }
    }
    loadOrders();
  }, []);

  function createData(order) {
    return {
      name: order.user.name,
      orderId: order._id,
      date: formatDate(order.createdAt),
      status: order.status,
      products: order.products,
      address: order.address, // Altere "description" para "address" aqui
      
    };
  }

  useEffect(() => {
    const newRows = filteredOrders.map((ord) => createData(ord));
    //console.log("AAAAAAAAAAA", newRows);
    setRows(newRows);
  }, [filteredOrders]);

  // useEffect(() => {
  //   if (Array.isArray(filteredOrders) && filteredOrders.length > 0) {
  //     const newRows = filteredOrders.map((ord) => createData(ord));
  //     console.log("AAAAAAAAAAA", newRows);
  //     setRows(newRows);
  //   }
  // }, [filteredOrders]);

  // Vai atualizar todos os pedidos filtrados
  useEffect(() => {
    if (activeStatus === 1) {
      setFilteredOrders(orders);
    } else {
      const statusIndex = status.findIndex((sts) => sts.id === activeStatus);
      const newFilteredOrders = orders.filter(
        (order) => order.status === status[statusIndex].value
      );
      setFilteredOrders(newFilteredOrders);
    }
  }, [orders]);

  // Função do filtro do menu de seleção de status
  function hundleStatus(status) {
    if (status.id === 1) {
      setFilteredOrders(orders);
    } else {
      const newOrders = orders.filter((order) => order.status === status.value);
      setFilteredOrders(newOrders);
    }
    setActiveStatus(status.id);
  }

  return (
    <Container>
      <Menu>
        {status &&
          status.map((status) => (
            <LinkMenu
              key={status.id}
              onClick={() => hundleStatus(status)}
              isActiveStatus={activeStatus === status.id}
            >
              {status.label}
            </LinkMenu>
          ))}
      </Menu>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "#565656" }}>
            <TableRow>
              <TableCell />
              <TableCell style={{ color: "white" }}>Pedido</TableCell>
              <TableCell style={{ color: "white" }}>Cliente</TableCell>
              <TableCell style={{ color: "white" }}>Data do Pedido</TableCell>
              <TableCell style={{ color: "white" }}>Endereço</TableCell>
              <TableCell style={{ color: "white" }}>Contato</TableCell>
              <TableCell style={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderId}
                row={row}
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
