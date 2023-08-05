import '../styles/card.css';
import SerieCard from '../components/SerieCard';

export default function TVSeries({ data }: { data: SerieType[] | undefined }) {
  return (
    <div className="container">
      <h1 className='container-title'>TV Series</h1>
      <div className="series-grid">
        {data?.map((serie) => (
          <SerieCard key={serie.id} serie={serie} />
        ))}
      </div>
    </div>
  );
}
