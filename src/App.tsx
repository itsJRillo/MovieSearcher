import movieIcon from './assets/movie.png'
import './styles/App.css'
import SearchBar from "./components/SearchBar"

function App() {

  return (
    <>
      <div className='header'>
        <img src={movieIcon} className="icon" alt="Movie icon" />
        <h1>Movie Searcher</h1>
      </div>
      <div>
        <SearchBar/>
      </div>
    </>
  )
}

export default App
