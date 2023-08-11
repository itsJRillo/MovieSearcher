import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import "./styles/main.css"
import Header from "./components/Header"
import EmptyHeader from "./components/EmptyHeader"
// import MovieDetails from "./components/MovieDetails"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Movies from "./pages/Movies"
import TVSeries from "./pages/TVSeries"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegistrationForm"
import SearchPage from "./pages/SearchPage"
import MyListPage from "./pages/MyListPage"

function App() {
  const api_key = import.meta.env.VITE_API_KEY
  const navigate = useNavigate()
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null)

  const [movies, setMovies] = useState<MovieType[]>()
  const [popularMovies, setPopularMovies] = useState<MovieType[]>()
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>()
  //const [selectedMovie, setSelectedMovie] = useState<MovieType | SerieType>()

  const [series, setSeries] = useState<SerieType[]>()
  const [popularSeries, setPopularSeries] = useState<SerieType[]>()
  const [trendingSeries, setTrendingSeries] = useState<SerieType[]>()

  const [genres, setGenres] = useState<GenreType[]>([])

  const location = useLocation()

  const fetchTrending = async () => {
    const fetchGenres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)

    const fetchMovies: any =  [];

    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}`
      );
    
      const responseData = await response.json();
      fetchMovies.push(...responseData.results);
    }
    
    const fetchSeries = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}`
    )

    const fetchPopularMovies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
    )
    const fetchUpcomingMovies = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`
    )

    const fetchPopularSeries = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`
    )
    const fetchTrendingSeries = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}`
    )

    const [seriesRes, popularMoviesRes, upcomingMoviesRes, popularSeriesRes, trendingSeriesRes, genreListRes] =
      await Promise.all([
        fetchSeries,
        fetchPopularMovies,
        fetchUpcomingMovies,
        fetchPopularSeries,
        fetchTrendingSeries,
        fetchGenres
      ])

    const popularMoviesData = await popularMoviesRes.json()
    const upcomingMoviesData = await upcomingMoviesRes.json()

    const seriesData = await seriesRes.json()
    const popularSeriesData = await popularSeriesRes.json()
    const trendingSeriesData = await trendingSeriesRes.json()

    const genresList = await genreListRes.json()

    const moviesWithType = fetchMovies.map((movie: MovieType) => ({
      type: 'movie',
      ...movie,
    }))
    const popularMoviesWithType = popularMoviesData.results.map((movie: MovieType) => ({
      type: 'movie',
      ...movie,
    }))
    const upcomingMoviesWithType = upcomingMoviesData.results.map((movie: MovieType) => ({
      type: 'movie',
      ...movie,
    }))

    const seriesWithType = seriesData.results.map((serie: SerieType) => ({
      type: 'serie',
      ...serie,
    }))
    const popularSeriesWithType = popularSeriesData.results.map((serie: SerieType) => ({
      type: 'serie',
      ...serie,
    }))
    const trendingSeriesWithType = trendingSeriesData.results.map((serie: SerieType) => ({
      type: 'serie',
      ...serie,
    }))

    setMovies(moviesWithType)
    console.log(movies);
    
    setPopularMovies(popularMoviesWithType)
    setUpcomingMovies(upcomingMoviesWithType)

    setSeries(seriesWithType)
    setPopularSeries(popularSeriesWithType)
    setTrendingSeries(trendingSeriesWithType)

    setGenres(genresList)

  }

  const handleMovieClick = (media: MovieType | SerieType) => {
    // setSelectedMovie(media)
    console.log(media);
  }

  const handleLogin = (user: UserType) => {
    setLoggedInUser(user)
    localStorage.setItem("loggedInUser", JSON.stringify(user))
  }

  const handleLogout = () => {
    setLoggedInUser(null)
    localStorage.removeItem("loggedInUser")
    navigate("/", { replace: true })
  }

  useEffect(() => {
    fetchTrending()

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "null")
    setLoggedInUser(storedUser)
  }, [])

  return (
    <div>
      {loggedInUser ? <Header onLogout={handleLogout} /> : <EmptyHeader />}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <Navigate to="/home" /> : <LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={
              loggedInUser ? <Navigate to="/home" /> : <RegisterForm onRegister={handleLogin} />
            }
          />

          {(loggedInUser || location.pathname === "/" || location.pathname === "/sign-up") && (
            <>
              <Route path="/home" element={<Home data={{ movies: popularMovies, upcomingMovies: upcomingMovies, series: popularSeries, trendingSeries: trendingSeries }} />} />
              <Route path="/buscar" element={<SearchPage onMediaClick={handleMovieClick} />} />
              <Route path="/peliculas" element={<Movies data={movies} onMovieClick={handleMovieClick} filters={genres} />} />
              {/* <Route path="/peliculas/*" element={<MovieDetails media={selectedMovie} />} /> */}
              <Route path="/mi-lista" element={<MyListPage />} />
              <Route path="/series" element={<TVSeries data={series} />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  )

}

export default App
