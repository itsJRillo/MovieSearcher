import logo from '/assets/shotenLogo.png';
import homeIcon from '/assets/homeIcon.png';
import searchIcon from '/assets/searchIcon.png';
import listIcon from '/assets/listIcon.png';
import movieIcon from '/assets/movieIcon.svg';
import seriesIcon from '/assets/tvIcon.png';
import profileIcon from '/assets/profile.png';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

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
  flex-direction: column; 
  @media (min-width: 992px) {
    flex-direction: row; 
    font-size: 1rem;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 1;
  transition: opacity 0.3s ease;
  margin: 10px 10px;
  @media (min-width: 992px) {
    width: 60px;
    height: 60px;
  }
`;

const LogoutButton = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #f8b500;
  }
`;

const HoverContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;


const NavItem = styled.div`
display: flex;
align-items: center;
gap: 0.25rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-right: 0;
  align-items: center;
  font-size: 10px;
  @media (min-width: 992px) {
    margin-left: 0;
    margin-right: auto;
    flex-direction: row; 
    gap: 2rem;
    font-size: 15px;
  }
`;

const NavLinkText = styled(Link)`
  text-decoration: none;
  color: black;
  transition: color 0.3s ease;
  margin-top: 3px;
`;

const Image = styled.img`
  width: 12px;
  height: 12px;
  @media (min-width: 992px) {
    width: 25px;
    height: 25px;
  }
`;

const Title = styled.img`
  width: 200px;
  height: 50px;
  @media (min-width: 992px) {
    width: 275px;
    height: 75px;
    margin-right: 2rem;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 4px;
  z-index: 3;
`;

const DropdownMenuItem = styled(NavLinkText)`
  width: 100px;
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 5px;
  transition: color 0.3s ease;
  &:hover {
    color: #f8b500;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
  margin: 0.5rem 0;
`;


interface HeaderProps {
  onLogout: (user: UserType) => void;
  onChangeLanguage: (lan: string) => void;
}

const Header = ({ onLogout, onChangeLanguage }: HeaderProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownOpen = () => {
    setDropdownVisible(true);
  };

  const handleDropdownClose = () => {
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    const userJSON = localStorage.getItem('loggedInUser');
    if (userJSON) {
      const user: UserType = JSON.parse(userJSON);
      onLogout(user);
    }
    console.log(onChangeLanguage);
  };

  return (
    <HeaderContainer>
      <div>
        <Title src={logo} alt="logo Shoten" />
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

      {/* <div>
        <button onClick={onChangeLanguage}></button>
      </div> */}

      <HoverContainer onMouseEnter={handleDropdownOpen} onMouseLeave={handleDropdownClose}>
        <Icon src={profileIcon} alt="Profile icon" />
        {dropdownVisible && (
          <DropdownMenu>
            <DropdownMenuItem to="/cuenta">
              Cuenta
            </DropdownMenuItem>
            <DropdownMenuItem to="/mi-lista">
              Mi lista
            </DropdownMenuItem>
            <Divider />
            <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
          </DropdownMenu>
        )}
      </HoverContainer>

    </HeaderContainer>
  );
};

export default Header;
