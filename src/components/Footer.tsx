// Footer.js
import styled from 'styled-components';
import '../styles/footer.css';
import heartIcon from '../assets/heart.png';

const FooterContainer = styled.footer`
  background-color: #edcc58;
  padding: 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  font-size: 20px;
  color: black;
  font-weight: 600;
`;

const HeartIcon = styled.img`
  width: 25px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          Made with <HeartIcon src={heartIcon} alt="heart icon" /> by{' '}
          <a href="https://github.com/itsJRillo">itsJRillo</a>
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
