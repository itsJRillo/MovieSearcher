import "../styles/main.css"
import movieIcon from '../assets/movie.png'
import { Link } from "react-router-dom";
import styled from'styled-components'

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const linkStyle = {
  margin: '1rem',
  textDecoration: 'none',
  color: 'black',
  transition: 'color 0.3s ease',
};

const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <img src={movieIcon} className="icon" alt="Movie icon" />
        <h1>SHŌTEN</h1>
      </div>

      <NavBar>
        <Link style={linkStyle} to="/">HOME</Link>
        <Link style={linkStyle} to="/movies">MOVIES</Link>
        <Link style={linkStyle} to="/tv-series">TV SERIES</Link>
      </NavBar>
    </div>
  );
};

export default Header;
