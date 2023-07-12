import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";

import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";

import TVSeries from "./components/TVSeries";
import TVSeriesDetails from "./components/TVSeriesDetails";
import { useEffect, useState } from "react";


function App() {
  const [movies, setMovies] = useState<MovieType[]>();

  const fetchTrending = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4cfc5bbd8134d1f01ca455c7a21af7db`);
    const data = await res.json();
    setMovies(data.results);
  };
  
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home data={movies}/>} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/tv-series" element={<TVSeries />} />
        <Route path="/tv-series/:id" element={<TVSeriesDetails />} />
      </Routes>
    </>
  );
}

export default App;
