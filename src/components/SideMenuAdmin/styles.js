import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  /*background: #3c3c3c;*/
  background: #1b2531;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  width: 300px;
  top: 0;
  left: 0;

  hr {
    margin: 50px 15px;
  }
`;

export const ItemContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background: ${(props) => (props.isActive ? "#565656" : "none")};
  border-radius: 2px;
  margin: 8px;
  padding-left: 20px;

  .icon {
    color: #ffffff;
  }
`;

export const ListLink = styled(Link)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-decoration: none;
  margin-left: 17px;
`;
export const H1 = styled.h1`
  text-align: center;
  color: white;
  margin-top: 15px;
  margin-bottom: -32px;
`;

export const MenuBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .menuBottomStyle {
    display: flex;
    align-items: center;
  }
`;
