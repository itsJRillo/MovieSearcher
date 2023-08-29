import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

import logo from '/shotenLogo.png';
import searchIcon from '/searchIcon.svg';
import listIcon from '/listIcon.svg';
import movieIcon from '/movie.svg';
import seriesIcon from '/tvIcon.svg';
import profileIcon from '/user.png';
import languageIcon from '/language.png';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mediaQueries } from '../types/mediaQueries';
import "../styles/icon.css"

const HeaderContainer = styled.header`
  background-color: #f8b500;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 40px;
  height: 40px;
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
  width: 25px;
  height: 25px;
  @media (max-width: 600px){
    width: 35px;
    height: 35px;
  }
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
  @media (max-width: 600px) {
    right: -3rem;
    font-size: 1rem;
  }
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
  padding: .25rem;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ffd966;
  }
  `;

const LanguageOption = styled.option`
  font-size: 20px;
`;

interface HeaderProps {
  onLogout: (user: UserType) => void;
  onChangeLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Header = ({ onLogout, onChangeLanguage }: HeaderProps) => {
  const { t } = useTranslation();

  const pb = new PocketBase('https://shoten-api.pockethost.io');
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

  const [isMobileLayout, setIsMobileLayout] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobileLayout(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      {!isMobileLayout ? (
        <HeaderContainer data-cy="Header">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link to="/home">
              <Title src={logo} alt="logo Shoten" />
            </Link>
          </div>

          <Nav>
            <NavItem>
              <Image src={searchIcon} alt="search icon" />
              <NavLinkText to="/search">{t('searchTitle')}</NavLinkText>
            </NavItem>
            <NavItem>
              <Image src={listIcon} alt="list icon" />
              <NavLinkText to="/my-list">{t('listTitle')}</NavLinkText>
            </NavItem>
            <NavItem>
              <Image src={movieIcon} alt="movie icon" />
              <NavLinkText to="/movies">{t('moviesTitle')}</NavLinkText>
            </NavItem>
            <NavItem>
              <Image src={seriesIcon} alt="series" />
              <NavLinkText to="/tv-series">{t('tvTitle')}</NavLinkText>
            </NavItem>
          </Nav>

          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <Image src={languageIcon} />
              <LanguageDropdown defaultValue={""} onChange={onChangeLanguage}>
                <LanguageOption value=""></LanguageOption>
                <LanguageOption value="es">
                  ES
                </LanguageOption>
                <LanguageOption value="en">
                  EN
                </LanguageOption>
              </LanguageDropdown>
            </div>

            <HoverContainer onMouseEnter={handleDropdownOpen} onMouseLeave={handleDropdownClose}>
              <Icon src={profileIcon} alt="Profile icon" />
              {dropdownVisible && (
                <DropdownMenu>
                  <DropdownMenuItem to="/account">
                    {t("accountMenu")}
                  </DropdownMenuItem>
                  <DropdownMenuItem to="/my-list">
                    {t("listMenu")}
                  </DropdownMenuItem>
                  <Divider />
                  <LogoutButton onClick={handleLogout}>{t("logout")}</LogoutButton>
                </DropdownMenu>
              )}
            </HoverContainer>
          </div>

        </HeaderContainer>
      ) : (
        <HeaderContainer data-cy="Header">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link to="/home">
              <Title src={logo} alt="logo Shoten" />
            </Link>
            <HoverContainer onMouseEnter={handleDropdownOpen} onMouseLeave={handleDropdownClose}>
              <Icon src={profileIcon} alt="Profile icon" />
              {dropdownVisible && (
                <DropdownMenu>
                  <DropdownMenuItem to="/account">
                    {t("accountMenu")}
                  </DropdownMenuItem>
                  <DropdownMenuItem to="/my-list">
                    {t("listMenu")}
                  </DropdownMenuItem>
                  <Divider />
                  <LogoutButton onClick={handleLogout}>{t("logout")}</LogoutButton>
                </DropdownMenu>
              )}
            </HoverContainer>
          </div>

          <Nav>
            <NavItem>
              <Link to="/search">
                <Image className="icon" src={searchIcon} alt="search icon" />
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/my-list">
                <Image className="icon" src={listIcon} alt="list icon" />
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/movies">
                <Image className="icon" src={movieIcon} alt="movie icon" />
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/tv-series">
                <Image className="icon" src={seriesIcon} alt="series" />
              </Link>
            </NavItem>
          </Nav>
          <br />
        </HeaderContainer>
      )}
    </>
  );
};

export default Header;
