import PocketBase from 'pocketbase';

import logo from '/shotenLogo.png';
import homeIcon from '/homeIcon.png';
import searchIcon from '/searchIcon.png';
import listIcon from '/listIcon.png';
import movieIcon from '/movieIcon.svg';
import seriesIcon from '/tvIcon.png';
import profileIcon from '/user.png';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { mediaQueries } from '../types/mediaQueries';
import { useTranslation } from 'react-i18next';

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
  ${mediaQueries("lg")`
    flex-direction: row; 
    font-size: 1rem;
  `}
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 1;
  transition: opacity 0.3s ease;
  margin: 10px 10px;
  ${mediaQueries("lg")`
    width: 60px;
    height: 60px;
  `}
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
  ${mediaQueries("lg")`
    margin-left: 0;
    margin-right: auto;
    flex-direction: row; 
    gap: 2rem;
    font-size: 15px;
  `}
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
  ${mediaQueries("lg")`
  width: 25px;
  height: 25px;
  `}
`;

const Title = styled.img`
  width: 200px;
  height: 50px;
  ${mediaQueries("lg")`
    width: 275px;
    height: 75px;
    margin-right: 2rem;
  `}
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

const LanguageDropdown = styled.select`
  background-color: #f8b500;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  margin-right: 1rem;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  
  -moz-appearance:none;
  -webkit-appearance:none;
  appearance:none;

  &:hover {
    background-color: #ffd966;
  }
`;

const LanguageOption = styled.option`
  font-size: 14px;
`;

interface HeaderProps {
  onLogout: (user: UserType) => void;
  onChangeLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Header = ({ onLogout, onChangeLanguage }: HeaderProps) => {
  const pb = new PocketBase('https://shoten-api.pockethost.io');

  const { t } = useTranslation();
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
    pb.authStore.clear();
  };

  return (
    <HeaderContainer>
      <div>
        <Title src={logo} alt="logo Shoten" />
      </div>

      <Nav>
        <NavItem>
          <Image src={homeIcon} alt="search icon" />
          <NavLinkText to="/">{t('headerHomeTitle')}</NavLinkText>
        </NavItem>
        <NavItem>
          <Image src={searchIcon} alt="list icon" />
          <NavLinkText to="/buscar">{t('headerSearchTitle')}</NavLinkText>
        </NavItem>
        <NavItem>
          <Image src={listIcon} alt="movie icon" />
          <NavLinkText to="/mi-lista">{t('headerListTitle')}</NavLinkText>
        </NavItem>
        <NavItem>
          <Image src={movieIcon} alt="series" />
          <NavLinkText to="/peliculas">{t('headerMoviesTitle')}</NavLinkText>
        </NavItem>
        <NavItem>
          <Image src={seriesIcon} alt="series" />
          <NavLinkText to="/series">{t('headerTvTitle')}</NavLinkText>
        </NavItem>
      </Nav>

      <LanguageDropdown onChange={onChangeLanguage}>
        <LanguageOption value="en">EN</LanguageOption>
        <LanguageOption value="es">ES</LanguageOption>
      </LanguageDropdown>

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
