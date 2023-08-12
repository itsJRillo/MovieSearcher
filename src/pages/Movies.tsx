import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

import '../styles/card.css';
import '../styles/pagination.css';
import '../styles/media.css';
import Card from '../components/Card';
import { motion } from 'framer-motion';

const FilterButton = styled(motion.button)`
  background: none;
  color: inherit;
  border: white solid 3px;
  border-radius: 50px;
  padding: 20px 2rem;
  font: inherit;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  outline: inherit;
  background-color: #121212;
`;

export default function Movies({ data, onMovieClick, filters }: { data: MovieType[] | undefined, onMovieClick: (movie: MovieType) => void, filters: GenreType[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);

  const itemsPerPage = 12;

  const filteredMovies = data?.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const genreMatch = genreFilter === null || movie.genre_ids.includes(genreFilter);
    return titleMatch && genreMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMovies?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleGenreFilterChange = (genreID: number | null) => {
    setGenreFilter(genreID);
    setSelectedFilter(genreID);
    console.log(selectedFilter);
    setCurrentPage(1);
  }

  const handleClearFilters = () => {
    setTitleFilter("");
    setSelectedFilter(null);
    setGenreFilter(null);
    setCurrentPage(1);
  }

  const hasFilters = titleFilter !== "" || genreFilter !== null;

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    pressed: {
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    selected: {
      backgroundColor: '#FF5733',
    },
  };

  return (
    <div className="container">
      <h1 className='container-title'>Películas</h1>
      <div>
        {Object.values(filters).map((filter: any) => (
          <div key={filter[0].id} className='filter-container'>
            {hasFilters && (<FilterButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="pressed"
              onClick={handleClearFilters}>
              Eliminar filtros
            </FilterButton>)}

            {filter.map((item: any) => (
              <FilterButton
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
                key={item.id}
                onClick={() => handleGenreFilterChange(item.id)}
              >
                {item.name}
              </FilterButton>
            ))}
          </div>
        ))}
      </div>
      <div className="media-grid">
        {currentItems?.map((movie) => (
          <Link to={`/peliculas/${movie.id}`} key={movie.id} onClick={() => onMovieClick(movie)}>
            <Card media={movie} />
          </Link>
        ))}
      </div>
      {filteredMovies && (
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={Math.ceil(filteredMovies.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      )}
    </div>
  );

}