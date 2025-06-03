import React, { useState } from "react";
import styled from "styled-components";
import { Filter } from "lucide-react";
import RoomCard from "../components/RoomCard";
import { rooms } from "../data";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const HeroSection = styled.section`
  background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0.8) 0%,
      rgba(52, 73, 94, 0.8) 100%
    ),
    url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=600&fit=crop")
      center/cover;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FilterSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
`;

const FilterInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8b4513;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #8b4513;
  }
`;

const QuickFilters = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const QuickFilterButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${(props) => (props.$active ? "#8B4513" : "#ECF0F1")};
  background: ${(props) => (props.$active ? "#8B4513" : "white")};
  color: ${(props) => (props.$active ? "white" : "#2C3E50")};
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    border-color: #8b4513;
    background: ${(props) => (props.$active ? "#A0522D" : "#F8F9FA")};
  }
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: #8b4513;
    transform: translateY(-3px);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-weight: 500;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ResultsCount = styled.div`
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #8b4513;
  }
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const KosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [roomType, setRoomType] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");

  const quickFilters = [
    {
      key: "budget",
      label: "Budget (< 500K)",
      filter: (room: any) => room.price < 500000,
    },
    {
      key: "single",
      label: "Kamar Single",
      filter: (room: any) => room.type === "single",
    },
    {
      key: "ac",
      label: "Ber-AC",
      filter: (room: any) =>
        room.facilities.some((f: string) => f.toLowerCase().includes("ac")),
    },
    {
      key: "available",
      label: "Tersedia",
      filter: (room: any) => room.available,
    },
  ];

  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  const filteredRooms = rooms
    .filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        (!priceRange.min || room.price >= parseInt(priceRange.min)) &&
        (!priceRange.max || room.price <= parseInt(priceRange.max));

      const matchesType = roomType === "all" || room.type === roomType;

      const matchesAvailability =
        availability === "all" ||
        (availability === "available" && room.available) ||
        (availability === "unavailable" && !room.available);

      const matchesQuickFilters =
        activeQuickFilters.length === 0 ||
        activeQuickFilters.every((filterKey) => {
          const filter = quickFilters.find((f) => f.key === filterKey);
          return filter ? filter.filter(room) : true;
        });

      return (
        matchesSearch &&
        matchesPrice &&
        matchesType &&
        matchesAvailability &&
        matchesQuickFilters
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "floor":
          return a.floor - b.floor;
        default:
          return 0;
      }
    });

  const toggleQuickFilter = (filterKey: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((f) => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const availableRooms = rooms.filter((room) => room.available).length;
  const averagePrice =
    rooms.reduce((sum, room) => sum + room.price, 0) / rooms.length;

  return (
    <Container>
      <HeroSection>
        <HeroTitle>🏠 Kos Putra Syaiful</HeroTitle>
        <HeroSubtitle>
          Kos nyaman dan terjangkau untuk mahasiswa. Fasilitas lengkap, lokasi
          strategis, dan pengelolaan profesional.
        </HeroSubtitle>
      </HeroSection>

      <StatsSection>
        <StatCard>
          <StatNumber>{rooms.length}</StatNumber>
          <StatLabel>Total Kamar</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{availableRooms}</StatNumber>
          <StatLabel>Kamar Tersedia</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>Rp {Math.round(averagePrice / 1000)}K</StatNumber>
          <StatLabel>Harga Rata-rata</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Akses & Keamanan</StatLabel>
        </StatCard>
      </StatsSection>

      <FilterSection>
        <FilterTitle>
          <Filter size={20} />
          Filter Pencarian
        </FilterTitle>

        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Cari Kamar</FilterLabel>
            <FilterInput
              type="text"
              placeholder="Nama kamar atau deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Harga Minimum</FilterLabel>
            <FilterInput
              type="number"
              placeholder="300000"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, min: e.target.value }))
              }
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Harga Maksimum</FilterLabel>
            <FilterInput
              type="number"
              placeholder="1500000"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, max: e.target.value }))
              }
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Tipe Kamar</FilterLabel>
            <FilterSelect
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="all">Semua Tipe</option>
              <option value="single">Single</option>
              <option value="shared">Sharing</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <FilterSelect
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="available">Tersedia</option>
              <option value="unavailable">Penuh</option>
            </FilterSelect>
          </FilterGroup>
        </FilterGrid>

        <FilterLabel style={{ marginBottom: "0.5rem" }}>
          Filter Cepat:
        </FilterLabel>
        <QuickFilters>
          {quickFilters.map((filter) => (
            <QuickFilterButton
              key={filter.key}
              $active={activeQuickFilters.includes(filter.key)}
              onClick={() => toggleQuickFilter(filter.key)}
            >
              {filter.label}
            </QuickFilterButton>
          ))}
        </QuickFilters>
      </FilterSection>

      <ResultsHeader>
        <ResultsCount>Ditemukan {filteredRooms.length} kamar</ResultsCount>
        <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price-low">Harga: Rendah ke Tinggi</option>
          <option value="price-high">Harga: Tinggi ke Rendah</option>
          <option value="name">Nama: A-Z</option>
          <option value="floor">Lantai</option>
        </SortSelect>
      </ResultsHeader>

      {filteredRooms.length > 0 ? (
        <RoomsGrid>
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </RoomsGrid>
      ) : (
        <NoResults>
          Tidak ada kamar yang sesuai dengan kriteria pencarian Anda. Coba ubah
          filter atau kata kunci pencarian.
        </NoResults>
      )}
    </Container>
  );
};

export default KosPage;
