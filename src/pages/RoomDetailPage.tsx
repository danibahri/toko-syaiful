import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ArrowLeft,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
  Phone,
  MessageCircle,
  Star,
} from "lucide-react";
import { rooms } from "../data";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #8b4513;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #a0522d;
  }
`;

const ImageGallery = styled.section`
  margin-bottom: 3rem;
`;

const MainImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
`;

const Thumbnail = styled.img<{ $active: boolean }>`
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 3px solid ${(props) => (props.$active ? "#8B4513" : "transparent")};
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    border-color: #8b4513;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div``;

const RoomHeader = styled.div`
  margin-bottom: 2rem;
`;

const RoomTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const RoomSubtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0 0 1rem 0;
  line-height: 1.6;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const StatusBadge = styled.div<{ $available: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => (props.$available ? "#27AE60" : "#E74C3C")};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
`;

const TypeBadge = styled.div`
  background: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
`;

const InfoSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #8b4513;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  color: #2c3e50;
  font-weight: 600;
`;

const FacilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const FacilityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: #8b4513;
    background: white;
  }
`;

const FacilityIcon = styled.div`
  width: 35px;
  height: 35px;
  background: #27ae60;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

const PriceCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 0.5rem;
`;

const PriceUnit = styled.div`
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const ContactButton = styled.button<{ $primary?: boolean }>`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid ${(props) => (props.$primary ? "#8B4513" : "#ECF0F1")};
  background: ${(props) => (props.$primary ? "#8B4513" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#2C3E50")};
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$primary ? "#A0522D" : "#F8F9FA")};
    transform: translateY(-2px);
  }
`;

const OwnerCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const OwnerPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem auto;
  border: 4px solid #8b4513;
  display: block;
`;

const OwnerName = styled.h4`
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
`;

const OwnerTitle = styled.p`
  color: #7f8c8d;
  margin: 0 0 1rem 0;
`;

const LocationSection = styled.section`
  background: white;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1rem;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ReviewSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ReviewCard = styled.div`
  padding: 1.5rem;
  border: 2px solid #ecf0f1;
  border-radius: 10px;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewerName = styled.div`
  font-weight: 600;
  color: #2c3e50;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #f39c12;
`;

const ReviewText = styled.p`
  color: #2c3e50;
  line-height: 1.6;
  margin: 0;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <Container>
        <NotFound>
          Kamar tidak ditemukan.
          <br />
          <BackButton onClick={() => navigate("/kos")}>
            <ArrowLeft size={20} />
            Kembali ke Daftar Kos
          </BackButton>
        </NotFound>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/kos")}>
        <ArrowLeft size={20} />
        Kembali ke Daftar Kos
      </BackButton>

      <ImageGallery>
        <MainImage src={room.images[selectedImage]} alt={room.name} />
        <ThumbnailContainer>
          {room.images.map((image, index) => (
            <Thumbnail
              key={index}
              src={image}
              alt={`${room.name} ${index + 1}`}
              $active={selectedImage === index}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </ThumbnailContainer>
      </ImageGallery>

      <ContentGrid>
        <MainContent>
          <RoomHeader>
            <RoomTitle>{room.name}</RoomTitle>
            <RoomSubtitle>{room.description}</RoomSubtitle>
            <StatusContainer>
              <StatusBadge $available={room.available}>
                {room.available ? (
                  <CheckCircle size={20} />
                ) : (
                  <XCircle size={20} />
                )}
                {room.available ? "Tersedia" : "Penuh"}
              </StatusBadge>
              <TypeBadge>
                {room.type === "single" ? "Kamar Single" : "Kamar Sharing"}
              </TypeBadge>
            </StatusContainer>
          </RoomHeader>

          <InfoSection>
            <SectionTitle>Informasi Kamar</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoIcon>📐</InfoIcon>
                <InfoText>Ukuran: {room.size}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>
                  <Users size={20} />
                </InfoIcon>
                <InfoText>Kapasitas: {room.maxOccupants} orang</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>
                  <MapPin size={20} />
                </InfoIcon>
                <InfoText>Lantai: {room.floor}</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>🏠</InfoIcon>
                <InfoText>
                  Tipe:{" "}
                  {room.type === "single" ? "Kamar Sendiri" : "Kamar Bersama"}
                </InfoText>
              </InfoItem>
            </InfoGrid>
          </InfoSection>

          <InfoSection>
            <SectionTitle>Fasilitas Kamar</SectionTitle>
            <FacilitiesGrid>
              {room.facilities.map((facility, index) => (
                <FacilityItem key={index}>
                  <FacilityIcon>✓</FacilityIcon>
                  <div>{facility}</div>
                </FacilityItem>
              ))}
            </FacilitiesGrid>
          </InfoSection>

          <ReviewSection>
            <SectionTitle>Review Penghuni</SectionTitle>
            <ReviewCard>
              <ReviewHeader>
                <ReviewerName>Ahmad R.</ReviewerName>
                <ReviewRating>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </ReviewRating>
              </ReviewHeader>
              <ReviewText>
                Kamar nyaman, bersih, dan fasilitasnya lengkap. Pak Syaiful
                orangnya baik dan responsif. Lokasi strategis dekat dengan
                kampus dan warung 24 jam sangat membantu.
              </ReviewText>
            </ReviewCard>

            <ReviewCard>
              <ReviewHeader>
                <ReviewerName>Budi S.</ReviewerName>
                <ReviewRating>
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  <Star size={16} />
                </ReviewRating>
              </ReviewHeader>
              <ReviewText>
                Harga terjangkau untuk fasilitas yang didapat. Wi-Fi cepat, air
                lancar, dan keamanan terjaga. Recommended untuk mahasiswa!
              </ReviewText>
            </ReviewCard>
          </ReviewSection>
        </MainContent>{" "}
        <Sidebar>
          <PriceCard>
            <Price>Rp {room.price.toLocaleString("id-ID")}</Price>
            <PriceUnit>per bulan</PriceUnit>

            <ContactButton>
              <Phone size={20} />
              +62 823-3388-5375
            </ContactButton>
            <ContactButton>
              <MessageCircle size={20} />
              <a href="https://wa.me/6282333885375">Chat WhatsApp</a>
            </ContactButton>
          </PriceCard>{" "}
          <OwnerCard>
            <OwnerPhoto src="/img/owner.jpg" alt="Pak Syaiful" />
            <OwnerName>Pak Syaiful</OwnerName>
            <OwnerTitle>Pemilik Kos & Warung</OwnerTitle>
            <ContactButton>
              <Phone size={20} />
              +62 823-3388-5375
            </ContactButton>
            <ContactButton>
              <MessageCircle size={20} />
              <a href="https://wa.me/+6282333885375">Chat WhatsApp</a>
            </ContactButton>
          </OwnerCard>
          <LocationSection>
            <SectionTitle>Lokasi Kos</SectionTitle>
            <p style={{ color: "#7F8C8D", marginBottom: "1rem" }}>
              Pangarangan, Kec. Kota Sumenep, Kabupaten Sumenep, Jawa Timur
            </p>
            <MapContainer>
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1748925481417!6m8!1m7!1sQg7LPjjGUIwFzNbfN8hv7A!2m2!1d-7.002965713376427!2d113.8719706320937!3f16.86473168603559!4f-9.218197362148786!5f0.7820865974627469"
                title="Lokasi Kos Syaiful"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </MapContainer>
          </LocationSection>
        </Sidebar>
      </ContentGrid>
    </Container>
  );
};

export default RoomDetailPage;
