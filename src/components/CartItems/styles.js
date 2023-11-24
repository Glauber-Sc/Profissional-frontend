


// import styled from 'styled-components'

// export const Container = styled.div`
//     background-color: #ffffff;
//     box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
//     border-radius: 20px;
//     padding: 10px;
//     width: 400px;
    
// `

// export const Header = styled.div`
//     display: grid;
//     grid-template-columns: repeat(5, 1fr);
//     padding: 10px;
//     border-bottom: 1px solid #b5b5b5;

//     p {
//         font-size: 20px;
//         color: #b5b5b5;
//         margin-left: 10px;
//     }
// `

// export const Body = styled.div`
//     display: grid;
//     grid-template-columns: repeat(5, 1fr);
//     padding: 10px;
    
 

//     img {
//         border-radius: 10px;
//         width: 70px;
        
//     }

//     p {
//         font-size: 13px;
//         color: #000000;
//         width: 20px;
//         margin-left: 10px;
      
//     }

//     .quantity-container {
//         display: flex;
//         gap: 5px;
//         margin-left: 10px;

//         button {
//             height: 10px;
//             background: transparent;
//             border: none;
//             font-size: 24px;
      
           
//         }

//         p {
//             margin-top: 5px;
//             margin-left: 10px;
//         }
        
//     }
// `

// export const EmptyCart = styled.p`
//     padding: 20px;
//     text-align: center;
//     font-weight: bold;
// `


import styled from 'styled-components';

export const ContainerButton = styled.button`
  background-color: #F0C137;
  color: #eeeeee;
  font-size: 20px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  padding: 0; /* Remova qualquer preenchimento interno */

  &:hover {
    background-color: #e0a126;
  }
`;

export const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  padding: 10px;
  width: 400px;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px;
  border-bottom: 1px solid #b5b5b5;

  p {
    font-size: 20px;
    color: #b5b5b5;
    margin-left: 10px;
  }
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px;

  img {
    border-radius: 10px;
    width: 70px;
  }

  p {
    font-size: 13px;
    color: #000000;
    width: 20px;
    margin-left: 10px;
  }

  .quantity-container {
    display: flex;
    gap: 5px;
    margin-left: 10px;

    ${ContainerButton} {
      font-size: 20px;
    }

    p {
      margin-top: 5px;
      margin-left: 10px;
    }
  }
`;

export const EmptyCart = styled.p`
  padding: 20px;
  text-align: center;
  font-weight: bold;
`;
