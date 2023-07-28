import logo from '../assets/shotenLogo.png';
import homeIcon from '../assets/homeIcon.png';
import searchIcon from '../assets/searchIcon.png';
import listIcon from '../assets/listIcon.png';
import movieIcon from '../assets/movieIcon.svg';
import seriesIcon from '../assets/tvIcon.png';
import profileIcon from '../assets/profile.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #f8b500;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  position: relative;
  z-index: 1;
  transition: opacity 0.3s ease;
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
  display: flex;
  align-items: center;
  &:hover {
    ${Icon} {
      opacity: 0;
    }
    ${TextOverlay} {
      opacity: 1;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  margin-right: auto;
  align-items: center;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const NavLinkText = styled(Link)`
  text-decoration: none;
  color: black;
  transition: color 0.3s ease;
  margin-top: 3px;

  &:hover {
    color: #fff;
  }
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
`;

const Title = styled.img`
  width: 275px;
  height: 75px;
  margin-right: 2rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <Title src={logo} alt="logo Shoten"/>
      </div>

      <Nav>
        <NavItem>
          <Image src={homeIcon} alt="search icon" />
          <NavLinkText to="/">INICIO</NavLinkText>
        </NavItem>
        <NavItem>
          <Image src={searchIcon} alt="list icon" />
          <NavLinkText to="/buscar">BÚSQUEDA</NavLinkText>
        </NavItem>
        <NavItem>
          <Image src={listIcon} alt="movie icon" />
          <NavLinkText to="/mi-lista">MI LISTA</NavLinkText>
        </NavItem>
        <NavItem>
          <Image src={movieIcon} alt="series" />
          <NavLinkText to="/peliculas">PELÍCULAS</NavLinkText>
        </NavItem>
        <NavItem>
          <Image src={seriesIcon} alt="series" />
          <NavLinkText to="/series">SERIES</NavLinkText>
        </NavItem>
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
