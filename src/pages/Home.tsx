import MovieCard from '../components/MovieCard';
import '../styles/movies.css';

export default function Home({ data }: { data: MovieType[] | undefined }) {
  return (
    <div className="container">
      <h1>Popular Movies</h1>
      <div className="movie-row">
        {data?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h1>Top-Rated Movies</h1>
      <div className="movie-row">
        {data?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h1>Upcoming Movies</h1>
      <div className="movie-row">
        {data?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
