import { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import ReactPaginate from 'react-paginate';
import '../styles/card.css';
import '../styles/pagination.css';

export default function Movies({ data, onMovieClick }: { data: MovieType[] | undefined, onMovieClick: (movie: MovieType) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div className="container">
      <h1 className='container-title'>Movies</h1>
      <div className="movie-grid">
        {currentItems?.map((movie) => (
          <Link to={`/peliculas/${movie.id}`} key={movie.id} onClick={() => onMovieClick(movie)}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>

      {data && (
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={Math.ceil(data.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
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
