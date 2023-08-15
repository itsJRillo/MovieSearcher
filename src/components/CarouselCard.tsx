import React, { useState } from 'react';
import '../styles/carouselCard.css';

interface CarouselCardProps {
  media: MovieType | SerieType
}

const CarouselCard: React.FC<CarouselCardProps> = ({ media }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMovieType = media.type === "movie";

  return (
    <div
      className={`carousel-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="carousel-card-image-container"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${media.poster_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ paddingTop: '100%' }}></div>
      </div>
      <div className="carousel-card-content">
        <h2 className="carousel-card-title">
          {isMovieType ? media.title : (media as SerieType).name}
        </h2>
        <div className="carousel-card-vote-container">
          <svg
            className="carousel-card-vote-icon"
            style={{ fill: '#f9cc6c' }}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
          >
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
          <p className="carousel-card-vote-average">{media.vote_average}</p>
        </div>
      </div>
      {isHovered && (
        <div className="carousel-card-overlay">
          <p className="carousel-card-description">{media.overview}</p>
        </div>
      )}
    </div>
  );
};

export default CarouselCard;
