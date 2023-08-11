import CarouselCard from '../components/CarouselCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles/card.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 5,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 4,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};

export default function Home({
  data,
}: {
  data: {
    movies: MovieType[] | undefined;
    upcomingMovies: MovieType[] | undefined;
    series: SerieType[] | undefined;
    trendingSeries: SerieType[] | undefined;
  };
}) {

  return (
    <div className="container">
      <div className="sub-container">
        <h1>Popular Movies</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {/* <div>1</div> */}
          {data.movies?.map((movie) => (
            <CarouselCard key={movie.id} media={movie} />
          ))}
        </Carousel>
      </div>
      <br />
      <div className="sub-container">
        <h1>Upcoming Movies</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {/* <div>1</div> */}
          {data.upcomingMovies?.map((movie) => (
            <CarouselCard key={movie.id} media={movie} />
          ))}
        </Carousel>
      </div>
      <br />
      <div className="sub-container">
        <h1>Popular Series</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {/* <div>1</div> */}
          {data.series?.map((serie) => (
            <CarouselCard key={serie.id} media={serie} />
          ))}
        </Carousel>
      </div>
      <br />
      <div className="sub-container">
        <h1>Top-rated Series</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {/* <div>1</div> */}
          {data.trendingSeries?.map((serie) => (
            <CarouselCard key={serie.id} media={serie} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
