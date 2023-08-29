import React, { useState } from 'react';
import '../styles/carouselCard.css';
import { Link } from 'react-router-dom';

interface CarouselCardProps {
  media: MovieType | SerieType
  onMediaClick?: (movie: MovieType | SerieType) => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ media, onMediaClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMovieType = media.type === "movie";

  return (
    <div
      className={`carousel-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-card-image-container">
        <Link
          to={isMovieType ? `/movies/${media.id}` : `/tv-series/${media.id}`}
          onClick={() => onMediaClick?.(media)}
        >
          <img
            className="card-image"
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            alt={isMovieType ? media.title : (media as SerieType).name}
          />
        </Link>
      </div>
    </div>
  );
};

export default CarouselCard;
