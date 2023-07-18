import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import Footer from "./components/Footer";


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
      `https://api.themoviedb.org/3/movie/trending?api_key=${api_key}`
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
      <Routes>
        <Route
          path="/"
          element={<Home data={{ movies: popularMovies, upcomingMovies: upcomingMovies, series: series }} />}
        />
        <Route path="/movies" element={<Movies data={movies} onMovieClick={handleMovieClick} />} />
        <Route path="/tv-series" element={<TVSeries data={series} />} />
        <Route path="/movies/*" element={<MovieDetails movie={selectedMovie} />}/>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
