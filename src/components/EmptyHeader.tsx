import styled from 'styled-components';
import ShotenLogo from "/shotenLogo.png";
import languageIcon from '/language.png';
import { mediaQueries } from '../types/mediaQueries';

const HeaderContainer = styled.header`
  background-color: #f8b500;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const Title = styled.img`
  width: 275px;
  height: 75px;
`;

const LanguageDropdown = styled.select`
  background-color: #f8b500;
  color: black;
  border: none;
  border-radius: 4px;
  padding: .25rem;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ffd966;
  }
`;

const LanguageOption = styled.option`
  font-size: 14px;
`;

const Image = styled.img`
  width: 12px;
  height: 12px;
  ${mediaQueries("lg")`
    width: 25px;
    height: 25px;
  `}
`;

const EmptyHeader = ({ onChangeLanguage }: { onChangeLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void; }) => {
  return (
    <HeaderContainer data-cy="EmptyHeader">

      <Title src={ShotenLogo} alt="Logo" />

      <Image src={languageIcon} />
      <LanguageDropdown onChange={onChangeLanguage}>
        <LanguageOption value="en">EN</LanguageOption>
        <LanguageOption value="es">ES</LanguageOption>
      </LanguageDropdown>
    </HeaderContainer>
  );
};

export default EmptyHeader;
