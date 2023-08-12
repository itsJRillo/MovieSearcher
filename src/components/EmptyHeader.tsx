import styled from 'styled-components';
import ShotenLogo from "../../public/assets/shotenLogo.png";

const HeaderContainer = styled.header`
  background-color: #f8b500;
  padding: 0 2rem;
  display: flex;
  justify-content: center; /* Center horizontally */
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

const EmptyHeader = () => {
  return (
    <HeaderContainer>
      <Title src={ShotenLogo} alt="Logo" />
    </HeaderContainer>
  );
};

export default EmptyHeader;
