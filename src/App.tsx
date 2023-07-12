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
  

  const fetchTrending = async () => {
    const resMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4cfc5bbd8134d1f01ca455c7a21af7db`);
    const resSeries = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=4cfc5bbd8134d1f01ca455c7a21af7db`);
    const resPopularMovies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4cfc5bbd8134d1f01ca455c7a21af7db`);

    const moviesData = await resMovies.json();
    const seriesData = await resSeries.json();
    const popularMoviesData = await resPopularMovies.json();

    setMovies(moviesData.results);
    setSeries(seriesData.results);
    setPopularMovies(popularMoviesData.results)
  };
  
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home data={popularMovies}/>} />
        <Route path="/movies" element={<Movies data={movies}/>} />
        <Route path="/tv-series" element={<TVSeries data={series}/>} />
      </Routes>
    </>
  );
}

export default App;
