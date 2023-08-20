import CarouselCard from '../components/CarouselCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles/card.css';
import '../styles/home.css';
import FullWidthCard from '../components/FullWidthCard';

const responsiveFullWidth = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};

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
    lan: string
  };
}) {
  return (
    <div>
      <div>
        <Carousel
          arrows
          swipeable
          responsive={responsiveFullWidth}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {data.movies?.map((movie) => (
            <FullWidthCard key={movie.id} media={movie} lan={data.lan}/>
          ))}
        </Carousel>
      </div>
      <br />
      <div className="sub-container">
        <h1>Próximos estrenos</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {data.upcomingMovies?.map((movie) => (
            <CarouselCard key={movie.id} media={movie}/>
          ))}
        </Carousel>
      </div>
      <br />
      <div className="sub-container">
        <h1>Series populares</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        > 
          {data.series?.map((serie) => (
            <CarouselCard key={serie.id} media={serie} />
          ))}
        </Carousel>
      </div>
      <br />
      <div className="sub-container">
        <h1>Series mejor valoradas</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {data.trendingSeries?.map((serie) => (
            <CarouselCard key={serie.id} media={serie} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
