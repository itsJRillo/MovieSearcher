import styled from 'styled-components';
import heartIcon from '/heart.png';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  background-color: #f8b500;
  padding: 20px 0 20px 0;
  text-align: center;
  width: 100%;
`;

const FooterContent = styled.div`
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
  const { t } = useTranslation();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          {t("footerMessage")} <HeartIcon src={heartIcon} alt="heart icon" /> {t("footerMessage2")}{' '}
          <a href="https://github.com/itsJRillo">itsJRillo</a>
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
