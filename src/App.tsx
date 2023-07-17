import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";


function App() {
  const [movies, setMovies] = useState<MovieType[]>();
  const [series, setSeries] = useState<SerieType[]>();
  const [popularMovies, setPopularMovies] = useState<MovieType[]>();
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>();
  const api_key = import.meta.env.VITE_API_KEY;
  

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
      <Routes>
        <Route
          path="/"
          element={<Home data={{ movies: popularMovies, upcomingMovies: upcomingMovies, series: series }} />}
        />
        <Route path="/movies" element={<Movies data={movies} />} />
        <Route path="/tv-series" element={<TVSeries data={series} />} />
      </Routes>
    </>
  );
}

export default App;
