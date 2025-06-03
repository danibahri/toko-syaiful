import React from "react";
import styled from "styled-components";
import { Home, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.2)" : "transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
`;

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Container>
        <Logo>Toko Syaiful</Logo>
        <Navigation>
          <NavLink to="/" $active={location.pathname === "/"}>
            <Home size={20} />
            Beranda
          </NavLink>
          <NavLink to="/kos" $active={location.pathname === "/kos"}>
            <Building2 size={20} />
            Kos Putra
          </NavLink>
        </Navigation>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
