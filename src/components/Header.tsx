import "../styles/main.css"
import movieIcon from '../assets/movie.png'

const Header = () => {
  return (
    <div className='header'>
    <img src={movieIcon} className="icon" alt="Movie icon" />
    <h1>Movie Searcher</h1>
    </div> 
  );
};

export default Header;
