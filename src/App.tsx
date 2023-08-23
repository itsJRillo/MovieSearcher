import PocketBase from 'pocketbase';

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

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation } from 'react-i18next';

import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

function App() {
  const pb = new PocketBase('https://shoten-api.pockethost.io');

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

  const [, setFavorites] = useState([{}])

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

  const { i18n } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const handleMediaClick = (media: MovieType | SerieType) => {
    setSelectedMovie(media)
  }

  const handleAddToFavorites = (media: MovieType | SerieType) => {
    const storedFavorites = localStorage.getItem('favorites');

    let favoritesArray: (MovieType | SerieType)[] = [];

    if (storedFavorites) {
      try {
        favoritesArray = JSON.parse(storedFavorites);
      } catch (error) {
        console.error('Error parsing stored favorites:', error);
      }
    }

    const isMediaInFavorites = favoritesArray.some(item => item.id === media.id);

    if (!isMediaInFavorites) {
      favoritesArray.push(media);

      localStorage.setItem('favorites', JSON.stringify(favoritesArray));

      setFavorites(favoritesArray);
    }
  };


  const handleLogin = (user: UserType) => {
    setLoggedInUser(user)
    localStorage.setItem("loggedInUser", JSON.stringify(pb.authStore.model))
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
      {loggedInUser ? <Header onLogout={handleLogout} onChangeLanguage={handleLanguageChange}/> : <EmptyHeader />}
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
                <Route path="/buscar" element={<SearchPage onMediaClick={handleMediaClick} />} />
                <Route path="/peliculas" element={<Movies data={movies} onMediaClick={handleMediaClick} filters={genresMovies} onAddToFavorites={handleAddToFavorites} />} />
                <Route path="/peliculas/*" element={<MediaDetails media={selectedMovie} language={language} />} />
                <Route path="/tv-series/*" element={<MediaDetails media={selectedMovie} language={language} />} />
                <Route path="/mi-lista" element={<MyListPage />} />
                <Route path="/series" element={<TVSeries data={series} onSerieClick={handleMediaClick} filters={genresTV} onAddToFavorites={handleAddToFavorites} />} />
                <Route path="/cuenta" element={<Profile />} />
              </>
            )}
          </Routes>
        )}

      </div>
      <Footer />
    </div>
  )

}

// Configura i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    fallbackLng: 'en', // Idioma predeterminado si no se encuentra la traducción
    debug: true, // Activa el modo de depuración para ver mensajes en la consola
    interpolation: {
      escapeValue: false, // Permite el uso de HTML en las cadenas de texto traducidas
    },
  });

export default App;
