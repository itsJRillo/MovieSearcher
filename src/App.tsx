import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./styles/main.css";
import Header from "./components/Header";
import EmptyHeader from "./components/EmptyHeader";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegistrationForm";
import SearchPage from "./pages/SearchPage";
import MyListPage from "./pages/MyListPage";

function App() {
  const api_key = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  
  const [movies, setMovies] = useState<MovieType[]>();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [popularMovies, setPopularMovies] = useState<MovieType[]>();
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>();
  const [series, setSeries] = useState<SerieType[]>();
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

  const location = useLocation();

  const fetchTrending = async () => {
    const fetchMovies = fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`
    );
    const fetchSeries = fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}`
    );
    const fetchPopularMovies = fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
    );
    const fetchUpcomingMovies = fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`
    );

    const [moviesRes, seriesRes, popularMoviesRes, upcomingMoviesRes] =
      await Promise.all([
        fetchMovies,
        fetchSeries,
        fetchPopularMovies,
        fetchUpcomingMovies,
      ]);

    const moviesData = await moviesRes.json();
    const seriesData = await seriesRes.json();
    const popularMoviesData = await popularMoviesRes.json();
    const upcomingMoviesData = await upcomingMoviesRes.json();

    setMovies(moviesData.results);
    setSeries(seriesData.results);
    setPopularMovies(popularMoviesData.results);
    setUpcomingMovies(upcomingMoviesData.results);
  };

  const handleMovieClick = (movie: MovieType) => {
    setSelectedMovie(movie);
  };

  const handleLogin = (user: UserType) => {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/login", { replace: true });
  };


  useEffect(() => {
    fetchTrending();

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    setLoggedInUser(storedUser);
  }, []);

  return (
    <div>
      {loggedInUser ? <Header onLogout={handleLogout}/> : <EmptyHeader/>}
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={loggedInUser ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={
              loggedInUser ? <Navigate to="/" /> : <RegisterForm onRegister={handleLogin} />
            }
          />
  
          {(loggedInUser || location.pathname === "/login" || location.pathname === "/sign-up") && (
            <>
              <Route path="/" element={<Home data={{ movies: popularMovies, upcomingMovies: upcomingMovies, series: series }} />} />
              <Route path="/buscar" element={<SearchPage onMovieClick={handleMovieClick} />} />
              <Route path="/peliculas" element={<Movies data={movies} onMovieClick={handleMovieClick} />} />
              <Route path="/peliculas/*" element={<MovieDetails movie={selectedMovie} />} />
              <Route path="/mi-lista" element={<MyListPage />} />
              <Route path="/series" element={<TVSeries data={series} />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
  
  
}

export default App;
