import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useHistory } from "react-router-dom";

import Offers from "../../assets/oferta.jpg";
import { useCart } from "../../hooks/CartContext";
import api from "../../services/api";
import formatCurrency from "../../utils/formatCurrency";
import {
  Container,
  CategoryImage,
  ContainerItems,
  Image,
  Button,
} from "./styles";

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);
  const { putProductInCart } = useCart();
  const { push } = useHistory();

  // useEffect vai redenrizar as categorias quando a página de home for carregado
  useEffect(() => {
    async function loadOffers() {
      // Vai ser utilizado o endpoint de products, que vai ser retornado todos os produtos que o offer está como true.
      const { data } = await api.get("products");

      // Filtrando apenas os produtos que estão em oferta
      const onlyOffer = data
        .filter((product) => product.offer)
        .map((product) => {
          // Formatando a moeda
          return {
            ...product,
            formatedPrice: formatCurrency(product.price),
          };
        });

      console.log(onlyOffer);
      setOffers(onlyOffer);
    }

    loadOffers();
  }, []);

  // Pontos de quebra da biblioteca Carousel
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 },
  ];

  const renderPaginationDot = (onClick, index, isActive) => {
    return (
      <button
        onClick={onClick}
        className={`custom-pagination-dot ${isActive ? "active" : ""}`}
      />
    );
  };

  return (
    <Container>
      <CategoryImage src={Offers} alt="seção de ofertas" />
      <Carousel
        itemsToShow={5}
        style={{ width: "90%" }}
        breakPoints={breakPoints}
        renderPagination={({ pages, activePage, onClick }) => (
          <ul className="custom-pagination">
            {pages.map((page) => {
              const isActive = page === activePage;
              return (
                <li
                  key={page}
                  className={`custom-pagination-item ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() => onClick(page)}
                />
              );
            })}
          </ul>
        )}
        paginationDotRender={renderPaginationDot}
      >
        {offers &&
          offers.map((product) => (
            <ContainerItems key={product.id}>
              <Image src={product.url} alt="foto do produto em oferta" />
              <p className="productName">{product.name}</p>
              <p>{product.formatedPrice}</p>
              <Button
                onClick={() => {
                  putProductInCart(product);
                  push("/carrinho");
                }}
              >
                Peça agora
              </Button>
            </ContainerItems>
          ))}
      </Carousel>
    </Container>
  );
}
