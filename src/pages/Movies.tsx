import MovieCard from '../components/MovieCard';
import '../styles/movies.css';

export default function Movies({ data }: { data: MovieType[] | undefined }) {
  return (
    <div className="movie-grid">
      {data?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
