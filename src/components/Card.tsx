import React, { useState } from 'react';
import '../styles/card.css';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import defaultImage from '/placeholder-no-image.png';
import addIcon from '/heart.svg';
import removeIcon from '/heart-filled.svg';

interface CardProps {
  media: MovieType | SerieType;
  onAddToFavorites?: (media: MovieType | SerieType) => void;
  onRemoveFromFavorites?: (movie: MovieType | SerieType) => void;
  onMediaClick?: (movie: MovieType | SerieType) => void;
}

const Icon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const Card: React.FC<CardProps> = ({ media, onMediaClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMovieType = media.type === 'movie';

  const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const [favorites, setFavorites] = useState(storedFavorites);
  
  const isFavorite = favorites.some((fav: any) => fav.id === media.id);
  
  const hasPoster = media.poster_path !== null && media.poster_path !== undefined;

  const handleAddToFavorites = () => {
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== media.id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast.info('Removed from favorites ❤️');
      window.location.reload();
    } else {
      const updatedFavorites = [...favorites, media];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast.success('Added to favorites⭐');
    }
  };

  return (
    <div
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasPoster ? (
        <Link
          to={isMovieType ? `/peliculas/${media.id}` : `/series/${media.id}`}
          key={media.id}
          onClick={() => onMediaClick?.(media)}
        >
          <img
            className="card-image"
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            alt={isMovieType ? media.title : (media as SerieType).name}
          />
        </Link>
      ) : (
        <img className="card-image" src={defaultImage} alt="Imagen predeterminada" />
      )}
      <button className="add-to-favorites-button" onClick={handleAddToFavorites}>
        <Icon src={isFavorite ? removeIcon : addIcon} alt={isFavorite ? 'remove icon' : 'add icon'} />
      </button>

      <div className="card-content">
        <div className='card-content-top'>
        </div>
        <div className="vote-container">
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Card;
