import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import emptyListIcon from "/emptyList.png";
import Loading from "../components/Loading";
import Card from "../components/Card";

import styled from "styled-components";
import "../styles/favoritesList.css";
import "../styles/media.css";

const EmptyListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 15%;
`;

const EmptyListImage = styled.img`
  width: 250px;
`;

const EmptyListTitle = styled.h1`
  font-size: 48px;
`;

const EmptyListText = styled.p`
  font-size: 25px;
`;

export default function MyListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favorites?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const isEmpty = favorites.length === 0;

  return (
    <div className="media-container">
      {isEmpty ? (
        <EmptyListContainer>
          <EmptyListImage src={emptyListIcon} alt="empty list icon" />
          <EmptyListTitle>Mi lista está vacía</EmptyListTitle>
          <EmptyListText>El contenido que añadas a Mi lista aparecerá aquí</EmptyListText>
        </EmptyListContainer>
      ) : (
        <div style={{ padding: "2rem" }}>
          <h1 className='container-title'>Mi lista</h1>
          <div className="media-grid">
            {favorites.map((fav: any) => (
              <div key={fav.id} id={fav.id}>
                <Card media={fav} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!isEmpty && currentItems && (
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={Math.ceil(favorites.length / itemsPerPage)}
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
