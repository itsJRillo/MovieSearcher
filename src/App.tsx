import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import "./styles/main.css"
import Header from "./components/Header"
import EmptyHeader from "./components/EmptyHeader"
import MediaDetails from "./pages/MediaDetails"
import Footer from "./components/Footer"
import Loading from "./components/Loading";

import Home from "./pages/Home"
import Movies from "./pages/Movies"
import TVSeries from "./pages/TVSeries"
import LoginForm from "./pages/LoginForm"
import RegisterForm from "./pages/RegistrationForm"
import SearchPage from "./pages/SearchPage"
import MyListPage from "./pages/MyListPage"
import Profile from "./pages/Profile"

import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";
import itTranslation from "./locales/it.json";
import i18n from 'i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      it: { translation: itTranslation },
    },
    interpolation: {
      escapeValue: false,
    },
  });

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null)
  const [language, setLanguage] = useState("en")

  const [movies, setMovies] = useState<MovieType[]>()
  const [popularMovies, setPopularMovies] = useState<MovieType[]>()
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>()
  const [selectedMovie, setSelectedMovie] = useState<MovieType | SerieType>()

  const [series, setSeries] = useState<SerieType[]>()
  const [popularSeries, setPopularSeries] = useState<SerieType[]>()
  const [trendingSeries, setTrendingSeries] = useState<SerieType[]>()

  const [genresMovies, setGenresMovies] = useState<GenreType[]>([])
  const [genresTV, setGenresTV] = useState<GenreType[]>([])

  const api_key = import.meta.env.VITE_API_KEY
  const prefixAPI = "https://api.themoviedb.org/3"
  const sufixAPI = `api_key=${api_key}&language=${language}`

  const location = useLocation()

  const fetchTrending = async () => {
    setLoading(true);

    const fetchGenresMovies = await fetch(`${prefixAPI}/genre/movie/list?${sufixAPI}`)
    const fetchGenresTV = await fetch(`${prefixAPI}/genre/tv/list?${sufixAPI}`)

    const fetchMovies: any = [];
    const fetchSeries: any = [];

    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `${prefixAPI}/discover/movie?page=${page}&${sufixAPI}`
      );

      const responseData = await response.json();
      fetchMovies.push(...responseData.results);
    }

    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `${prefixAPI}/discover/tv?page=${page}&${sufixAPI}`
      )

      const responseData = await response.json();
      fetchSeries.push(...responseData.results);
    }

    const fetchPopularMovies = await fetch(
      `${prefixAPI}/movie/popular?${sufixAPI}`
    )
    const fetchUpcomingMovies = await fetch(
      `${prefixAPI}/movie/upcoming?${sufixAPI}`
    )

    const fetchPopularSeries = await fetch(
      `${prefixAPI}/tv/popular?${sufixAPI}`
    )
    const fetchTrendingSeries = await fetch(
      `${prefixAPI}/tv/top_rated?${sufixAPI}`
    )

    const [popularMoviesRes, upcomingMoviesRes, popularSeriesRes, trendingSeriesRes, genreListMoviesRes, genreListTVRes] =
      await Promise.all([
        fetchPopularMovies,
        fetchUpcomingMovies,
        fetchPopularSeries,
        fetchTrendingSeries,
        fetchGenresMovies,
        fetchGenresTV
      ])

    const popularMoviesData = await popularMoviesRes.json()
    const upcomingMoviesData = await upcomingMoviesRes.json()

    const popularSeriesData = await popularSeriesRes.json()
    const trendingSeriesData = await trendingSeriesRes.json()

    const genresListMovies = await genreListMoviesRes.json()
    const genresListTV = await genreListTVRes.json()

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

    const seriesWithType = fetchSeries.map((serie: SerieType) => ({
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
    setPopularMovies(popularMoviesWithType)
    setUpcomingMovies(upcomingMoviesWithType)

    setSeries(seriesWithType)
    setPopularSeries(popularSeriesWithType)
    setTrendingSeries(trendingSeriesWithType)

    setGenresMovies(genresListMovies)
    setGenresTV(genresListTV)

    setLoading(false);
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const handleMediaClick = (media: MovieType | SerieType) => {
    setSelectedMovie(media)
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
  }, [language])

  return (
    <div>
      {loggedInUser ? <Header onLogout={handleLogout} onChangeLanguage={handleLanguageChange} /> : <EmptyHeader onChangeLanguage={handleLanguageChange} />}
      <div className="container">
        {loading ? (<Loading />) : (
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
                <Route path="/home" element={<Home data={{ movies: popularMovies, upcomingMovies: upcomingMovies, series: popularSeries, trendingSeries: trendingSeries, language: language, onMediaClick: handleMediaClick }} />} />
                <Route path="/search" element={<SearchPage onMediaClick={handleMediaClick} />} />
                <Route path="/movies" element={<Movies data={movies} onMediaClick={handleMediaClick} filters={genresMovies} />} />
                <Route path="/peliculas/*" element={<MediaDetails media={selectedMovie} language={language} />} />
                <Route path="/tv-series/*" element={<MediaDetails media={selectedMovie} language={language} />} />
                <Route path="/my-list" element={<MyListPage onMediaClick={handleMediaClick}/>} />
                <Route path="/tv-series" element={<TVSeries data={series} onSerieClick={handleMediaClick} filters={genresTV} />} />
                <Route path="/account" element={<Profile />} />
              </>
            )}
          </Routes>
        )}

      </div>
      <Footer />
    </div>
  )
}

export default App;