import React from "react";
import styled from "styled-components";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #ff6b35;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #bdc3c7;

  &:hover {
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: #ff6b35;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #e55b2b;
    transform: translateY(-3px);
  }
`;

const FooterInfo = styled.div`
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #34495e;
  color: #bdc3c7;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterGrid>
          <FooterSection>
            <h3>Toko Syaiful</h3>
            <FooterInfo>
              Warung lengkap dengan kebutuhan sehari-hari dan kos nyaman untuk
              putra. Melayani dengan sepenuh hati sejak 2015.
            </FooterInfo>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Kontak Kami</h3>
            <ContactItem>
              <MapPin size={18} />
              <span>Jl. Akasia Pangarangan, Sumenep</span>
            </ContactItem>
            <ContactItem>
              <Phone size={18} />
              <span>+62 812-3456-7890</span>
            </ContactItem>
            <ContactItem>
              <Mail size={18} />
              <span>danibahri34@gmail.com</span>
            </ContactItem>
            <ContactItem>
              <Clock size={18} />
              <span>Buka 17 Jam</span>
            </ContactItem>
          </FooterSection>

          <FooterSection>
            <h3>Layanan Kami</h3>
            <FooterInfo>
              • Kebutuhan Pokok Harian
              <br />
              • Snack & Minuman
              <br />
              • Bumbu Dapur
              <br />
              • Kos Putra Nyaman
              <br />• Konsultasi Kos Gratis
            </FooterInfo>
          </FooterSection>

          <FooterSection>
            <h3>Jam Operasional</h3>
            <FooterInfo>
              <strong>Warung:</strong>
              <br />
              17 Jam setiap hari
              <br />
              <br />
              <strong>Kos:</strong>
              <br />
              Check-in: 24 Jam
              <br />
              Office: 08:00 - 22:00
              <br />
              <br />
              <strong>Konsultasi:</strong>
              <br />
              Senin - Minggu: 08:00 - 21:00
            </FooterInfo>
          </FooterSection>
        </FooterGrid>

        <Copyright>
          © 2025 Toko Syaiful. Semua hak cipta dilindungi. Dibuat dengan ❤️
          untuk melayani kebutuhan Anda.
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
