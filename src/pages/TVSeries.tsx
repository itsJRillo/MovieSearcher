import '../styles/movies.css';
import SerieCard from '../components/SerieCard';

export default function TVSeries({ data }: { data: SerieType[] | undefined }) {
  return (
    <div className="series-grid">
      {data?.map((serie) => (
        <SerieCard key={serie.id} serie={serie} />
      ))}
    </div>
  );
}
