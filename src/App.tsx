import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/main.css"
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import SearchPage from "./pages/SearchPage";
import MyListPage from "./pages/MyListPage";

function App() {
  const api_key = import.meta.env.VITE_API_KEY;

  const [movies, setMovies] = useState<MovieType[]>();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const [popularMovies, setPopularMovies] = useState<MovieType[]>();
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>();

  const [series, setSeries] = useState<SerieType[]>();

  const handleMovieClick = (movie: MovieType) => {
    setSelectedMovie(movie);
  };

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


  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
      <Header />
      <div className="container">

        <Routes>
          <Route
            path="/"
            element={<Home data={{ movies: popularMovies, upcomingMovies: upcomingMovies, series: series }} />}
          />
          <Route path="/buscar" element={<SearchPage onMovieClick={handleMovieClick} />} />
          <Route path="/peliculas" element={<Movies data={movies} onMovieClick={handleMovieClick} />} />
          <Route path="/peliculas/*" element={<MovieDetails movie={selectedMovie} />} />
          <Route path="/mi-lista" element={<MyListPage />} />
          <Route path="/series" element={<TVSeries data={series} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registro" element={<RegisterForm />} />

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
