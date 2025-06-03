import React, { useState } from "react";
import styled from "styled-components";
import { Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data";

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
    rgba(139, 69, 19, 0.8) 0%,
    rgba(160, 82, 45, 0.8) 100%
  );
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
  margin: 0 0 2rem 0;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const SearchSection = styled.section`
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

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #ecf0f1;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8b4513;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #ecf0f1;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #8b4513;
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
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

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 2rem 0;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TestimonialSection = styled.section`
  background: #f8f9fa;
  padding: 3rem 2rem;
  border-radius: 20px;
  margin-bottom: 3rem;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorInfo = styled.div`
  font-weight: 600;
  color: #2c3e50;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #f39c12;
  margin-left: auto;
`;

const OwnerSection = styled.section`
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const OwnerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const OwnerImageContainer = styled.div`
  flex-shrink: 0;
`;

const OwnerImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #8b4513;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const OwnerInfo = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const OwnerName = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const OwnerTitle = styled.p`
  font-size: 1.2rem;
  color: #8b4513;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const OwnerDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
`;

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const categories = [
    { value: "all", label: "Semua" },
    { value: "kebutuhan-pokok", label: "Kebutuhan Pokok" },
    { value: "snack", label: "Snack" },
    { value: "minuman", label: "Minuman" },
    { value: "bumbu", label: "Bumbu" },
  ];

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <Container>
      <HeroSection>
        <HeroTitle>Toko Syaiful</HeroTitle>
        <HeroSubtitle>
          Toko lengkap dengan kebutuhan sehari-hari dan kos nyaman untuk putra.
        </HeroSubtitle>
        <img
          src="/img/toko.jpg"
          alt="Warung Syaiful"
          style={{ width: "100%", borderRadius: "15px", marginTop: "1rem" }}
        />
      </HeroSection>
      <StatsSection>
        <StatCard>
          <StatNumber>50+</StatNumber>
          <StatLabel>Produk Tersedia</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>8</StatNumber>
          <StatLabel>Kamar Kos</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>100+</StatNumber>
          <StatLabel>Pelanggan Puas</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>5⭐</StatNumber>
          <StatLabel>Rating Warung</StatLabel>
        </StatCard>
      </StatsSection>
      <SearchSection>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Urutkan: Nama</option>
            <option value="price-low">Harga: Rendah ke Tinggi</option>
            <option value="price-high">Harga: Tinggi ke Rendah</option>
          </FilterSelect>
        </SearchContainer>

        <CategoryFilters>
          {categories.map((category) => (
            <CategoryButton
              key={category.value}
              $active={selectedCategory === category.value}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </CategoryButton>
          ))}
        </CategoryFilters>
      </SearchSection>
      <SectionTitle>Produk Pilihan</SectionTitle>{" "}
      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      <TestimonialSection>
        <SectionTitle>Testimoni Pelanggan</SectionTitle>
        <TestimonialGrid>
          <TestimonialCard>
            <TestimonialText>
              "Toko Pak Syaiful selalu jadi andalan untuk belanja harian. Harga
              terjangkau dan barang lengkap. Sambel pecelnya juga enak banget!"
            </TestimonialText>
            <TestimonialAuthor>
              <div>
                <AuthorInfo>Ahmad Rizki</AuthorInfo>
                <StarRating>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </StarRating>
              </div>
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialText>
              "Kos di sini nyaman, fasilitasnya lengkap, dan Pak Syaiful
              orangnya baik. Plus ada warungnya jadi praktis untuk beli
              kebutuhan sehari-hari."
            </TestimonialText>
            <TestimonialAuthor>
              <div>
                <AuthorInfo>Budi Santoso</AuthorInfo>
                <StarRating>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </StarRating>
              </div>
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialText>
              "Tempatnya strategis, dekat kampus. Warungnya buka 24 jam jadi
              sangat membantu kalau butuh sesuatu mendadak. Recommended!"
            </TestimonialText>
            <TestimonialAuthor>
              <div>
                <AuthorInfo>Dimas Pratama</AuthorInfo>
                <StarRating>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </StarRating>
              </div>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialSection>{" "}
      <OwnerSection>
        <SectionTitle>Pemilik</SectionTitle>
        <OwnerContent>
          <OwnerImageContainer>
            <OwnerImage
              src="/img/owner.jpg"
              alt="Pak Syaiful - Pemilik Warung & Kos"
            />
          </OwnerImageContainer>
          <OwnerInfo>
            <OwnerName>Moh. Syaiful Bahri</OwnerName>
            <OwnerTitle>Pemilik Toko & Kos Putra</OwnerTitle>
            <OwnerDescription>
              Berpengalaman lebih dari 15 tahun dalam melayani kebutuhan
              mahasiswa dan masyarakat sekitar. Pak Syaiful berkomitmen
              memberikan pelayanan terbaik dengan harga terjangkau dan kualitas
              terpercaya.
            </OwnerDescription>
          </OwnerInfo>
        </OwnerContent>
      </OwnerSection>
    </Container>
  );
};

export default HomePage;
