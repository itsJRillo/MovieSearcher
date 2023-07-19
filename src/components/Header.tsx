import movieIcon from '../assets/movie.png';
import profileIcon from '../assets/profile.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #edcc58;
  padding: 0 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative; /* Add position relative to the header container */
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  position: relative;
  z-index: 1; /* Add z-index to keep the icon on top of the text */
  transition: opacity 0.3s ease; /* Add transition for the icon opacity */
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  opacity: 0;
  z-index: 2;
  transition: opacity 0.3s ease;
`;

const LoginButton = styled(Link)`
  text-decoration: none;
  color: black;
`;

const RegisterButton = styled(Link)`
  text-decoration: none;
  color: black;
`;

const HoverContainer = styled.div`
  position: relative;
  &:hover {
    ${Icon} {
      opacity: 0; /* Hide the icon on hover */
    }

    ${TextOverlay} {
      opacity: 1; /* Show the text on hover */
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: color 0.3s ease;

  &:hover {
    color: #f8b500;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>
        <Icon src={movieIcon} alt="Movie icon" />
        <h1>SHŌTEN</h1>
      </Title>

      <Nav>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/movies">MOVIES</NavLink>
        <NavLink to="/tv-series">TV SERIES</NavLink>
      </Nav>

      <HoverContainer>
        <Icon src={profileIcon} alt="Profile icon" />
        <TextOverlay>
          <LoginButton to="/login">LOG IN</LoginButton>
          <RegisterButton to="/register">REGISTER</RegisterButton>
        </TextOverlay>
      </HoverContainer>

    </HeaderContainer>
  );
};

export default Header;
