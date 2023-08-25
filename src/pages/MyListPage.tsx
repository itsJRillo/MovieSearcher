import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import ReactPaginate from "react-paginate";

import emptyListIcon from "/emptyList.png";
import Loading from "../components/Loading";
import Card from "../components/Card";

import styled from "styled-components";
import "../styles/favoritesList.css";
import "../styles/media.css";
import { mediaQueries } from "../types/mediaQueries";

import { useTranslation } from "react-i18next";

const EmptyListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  @media (max-width: 600px) {
   margin-top: 4rem;
  }
`;

const EmptyListImage = styled.img`
  width: 200px;
  @media (max-width: 600px) {
    width: 100px;
  }
  `;
  
const EmptyListTitle = styled.h1`
  font-size: 48px;
  ${mediaQueries("sm")`
    font-size: 30px;
  `} 
  `;

const EmptyListText = styled.p`
  font-size: 25px;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export default function MyListPage({onMediaClick}:{onMediaClick: (movie: MovieType | SerieType) => void}) {
  const { t } = useTranslation();
  const pb = new PocketBase('https://shoten-api.pockethost.io');
  const user = pb.authStore.model;

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
    const storedFavorites = user?.favorites || [];

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
          <EmptyListTitle>{t("emptyListTitle")}</EmptyListTitle>
          <EmptyListText>{t("emptyListSubtitle")}</EmptyListText>
        </EmptyListContainer>
      ) : (
        <div style={{ padding: "2rem" }}>
          <h1 className='container-title'>{t("listTitlePage")}</h1>
          <div className="media-grid">
            {favorites.map((fav: any) => (
              <div key={fav.id}>
                <Card media={fav} onMediaClick={onMediaClick}/>
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
