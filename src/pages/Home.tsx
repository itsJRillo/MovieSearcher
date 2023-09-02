import CarouselCard from '../components/CarouselCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles/card.css';
import '../styles/home.css';
import FullWidthCard from '../components/FullWidthCard';
import { useTranslation } from 'react-i18next';

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
    language: string
    onMediaClick?: (movie: MovieType | SerieType) => void;
  };
}) {
  const { t } = useTranslation();
  
  return (
    <div style={{backgroundColor: "#121212"}}>
      <div>
        <Carousel
          arrows
          swipeable
          responsive={responsiveFullWidth}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          showDots
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {data.movies?.map((movie) => (
            <FullWidthCard key={movie.id} media={movie} language={data.language} onMediaClick={data.onMediaClick}/>
          ))}
        </Carousel>
      </div>
      <div className="sub-container">
        <h1>{t("homeMoviesLatest")}</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          showDots
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {data.upcomingMovies?.map((movie) => (
            <CarouselCard key={movie.id} media={movie} onMediaClick={data.onMediaClick}/>
          ))}
        </Carousel>
      </div>
      <div className="sub-container">
        <h1>{t("homeTVPopular")}</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          showDots
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        > 
          {data.series?.slice(0,15).map((serie) => (
            <CarouselCard key={serie.id} media={serie} onMediaClick={data.onMediaClick}/>
          ))}
        </Carousel>
      </div>
      <div className="sub-container">
        <h1>{t("homeTVBest")}</h1>
        <Carousel
          arrows
          swipeable
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          showDots
          ssr={true}
          customTransition="transform 500ms ease-in-out"
        >
          {data.trendingSeries?.map((serie) => (
            <CarouselCard key={serie.id} media={serie} onMediaClick={data.onMediaClick}/>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
