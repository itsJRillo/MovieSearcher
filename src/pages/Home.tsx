import CarouselCard from '../components/CarouselCard';
// import SerieCard from '../components/SerieCard';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css"

import '../styles/card.css';
import '../styles/carousel.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function Home({ data }: { data: { movies: MovieType[] | undefined, upcomingMovies: MovieType[] | undefined, series: SerieType[] | undefined } }) {
  return (
    <div className="container">
      <div className='sub-container'>
        <h1>Popular Movies</h1>
        <Carousel
          arrows
          autoPlay
          swipeable
          showDots
          responsive={responsive}
          itemClass="carousel-item"
          className='slider-container'
          removeArrowOnDeviceType={["tablet", "mobile"]}
          ssr={true}
        >
          {/* <div>1</div> */}
          {data.movies?.map((movie) => (
            <CarouselCard key={movie.id} movie={movie} />
          ))}
        </Carousel>

      </div>
      <br />
      <div className='sub-container'>
        <h1>Popular TV-Series</h1>
        {/* <Carousel
          arrows
          autoPlay
          swipeable
          showDots
          responsive={responsive}
          itemClass="carousel-item"
          className='slider-container'
          removeArrowOnDeviceType={["tablet", "mobile"]}
          ssr={true}
        >
          {data.series?.map((serie) => (
            <SerieCard key={serie.id} serie={serie} />
          ))}
        </Carousel> */}
      </div>
    </div>
  );
}
