import React from "react";
import styled from "styled-components";
import { Product } from "../types";

const Card = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #8b4513;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff6b35;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  color: #8b4513;
`;

const Stock = styled.span`
  font-size: 0.9rem;
  color: #27ae60;
  font-weight: 500;
`;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <ImageContainer>
        <Image src={product.image} alt={product.name} />
        <Badge>{product.category.replace("-", " ").toUpperCase()}</Badge>
      </ImageContainer>
      <Content>
        <Title>{product.name}</Title>
        <Description>{product.description}</Description>
        <PriceContainer>
          <Price>Rp {product.price.toLocaleString("id-ID")}</Price>
          <Stock>Stok: {product.stock}</Stock>
        </PriceContainer>
      </Content>
    </Card>
  );
};

export default ProductCard;
