import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';


export const Container = styled.div`
  padding: 20px;

  h2 {
    color: #F0C137;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .listavendas-form-control-container {
    margin-bottom: 16px;
    max-width: 300px;
  }

  .listavendas-form-control {
    width: 100%;
    height: 46px;
    background-color: #1b2531;
    border: 1px solid #384459;
    border-radius: 5px;
    color: #9AAABE;
    padding: 0 20px;
    font-size: 18px;
  }

  .listavendas-sales-table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .listavendas-sales-table thead {
    height: 55px;
    font-size: 16px;
    color: #E9E9E9;
    font-weight: 700;
  }

  .listavendas-sales-table tbody {
    font-size: 14px;
    font-weight: 400;
    color: #cfcfcf;
    text-align: center;
  }

  .listavendas-sales-table tr {
    height: 74px;
    border-top: 1px solid #5F6E82;
  }

  .listavendas-sales-table tbody tr:hover > td {
    background-color: #384459;
  }

  .listavendas-sales-table tbody tr:nth-child(odd) {
    background-color: #242C3B;
  }

  .listavendas-red-btn-container {
    display: flex;
    justify-content: center;
  }

  .shows576 {
    display: none;
  }

  .shows992 {
    display: none;
  }

  /*Somente a partir dessa largura 576px que vai ser aplicado o que está dentro do media*/
  @media (min-width: 576px) {
    .shows576 {
      display: table-cell;
    }

    .listavendas-card {
      padding: 35px;
    }

    .listavendas-sales-table tr {
      height: 55px;
    }

    .listavendas-sales-table tbody {
      font-size: 18px;
    }
  }

  @media (min-width: 992px) {
    .shows992 {
      display: table-cell;
    }
  }
`;

export const Img = styled.img`
  width: 70px;
  border-radius: 5px;
`;

export const EditIconStyles = styled(EditIcon)`
  cursor: pointer;
  color: #323d5d;
`;

export const StyledPaper = styled(Paper)`
  margin-top: 20px;
  padding: 20px;
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: 700 !important;
`;

export const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  max-width: 800px;
  overflow-x: auto;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f2f2f2;
  }
`;
