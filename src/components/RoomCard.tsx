import React from "react";
import styled from "styled-components";
import { Users, MapPin, Eye, CheckCircle, XCircle } from "lucide-react";
import { Room } from "../types";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #8b4513;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
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

const StatusBadge = styled.span<{ $available: boolean }>`
  position: absolute;
  top: 15px;
  left: 15px;
  background: ${(props) => (props.$available ? "#27AE60" : "#E74C3C")};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TypeBadge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #34495e;
`;

const FacilitiesContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const FacilitiesTitle = styled.h4`
  font-size: 1rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const FacilitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FacilityTag = styled.span`
  background: #ecf0f1;
  color: #2c3e50;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: #8b4513;
`;

const PriceUnit = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const ViewButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #a0522d 0%, #8b4513 100%);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/kos/${room.id}`);
  };

  return (
    <Card onClick={handleViewDetails}>
      <ImageContainer>
        <Image src={room.image} alt={room.name} />
        <StatusBadge $available={room.available}>
          {room.available ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {room.available ? "Tersedia" : "Penuh"}
        </StatusBadge>
        <TypeBadge>{room.type === "single" ? "Single" : "Sharing"}</TypeBadge>
      </ImageContainer>
      <Content>
        <Title>{room.name}</Title>
        <Description>{room.description}</Description>

        <InfoGrid>
          <InfoItem>
            <MapPin size={16} />
            Lantai {room.floor}
          </InfoItem>
          <InfoItem>
            <Users size={16} />
            Max {room.maxOccupants} orang
          </InfoItem>
          <InfoItem>📐 {room.size}</InfoItem>
          <InfoItem>
            🏠 {room.type === "single" ? "Kamar Sendiri" : "Kamar Bersama"}
          </InfoItem>
        </InfoGrid>

        <FacilitiesContainer>
          <FacilitiesTitle>Fasilitas:</FacilitiesTitle>
          <FacilitiesList>
            {room.facilities.slice(0, 4).map((facility, index) => (
              <FacilityTag key={index}>{facility}</FacilityTag>
            ))}
            {room.facilities.length > 4 && (
              <FacilityTag>+{room.facilities.length - 4} lainnya</FacilityTag>
            )}
          </FacilitiesList>
        </FacilitiesContainer>

        <PriceContainer>
          <div>
            <Price>Rp {room.price.toLocaleString("id-ID")}</Price>
            <PriceUnit>/bulan</PriceUnit>
          </div>
        </PriceContainer>

        <ViewButton>
          <Eye size={18} />
          Lihat Detail
        </ViewButton>
      </Content>
    </Card>
  );
};

export default RoomCard;
