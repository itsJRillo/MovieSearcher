import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';

const api_key = import.meta.env.VITE_API_KEY;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  overflow-x: hidden;
`;

const SearchBarContainer = styled.form`
  margin-top: 5rem;
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const SearchBarInput = styled.input`
  width: 95%;
  padding: 40px 40px 40px 40px;
  font-size: 30px;
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #f8b500;
    box-shadow: 0 0 5px rgba(248, 181, 0, 0.5);
  }
`;

const SearchIcon = styled.i`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #f8b500;
  }
`;

const ResultContainer = styled.div`
  min-height: 50vh;
  width: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 75px;
  justify-items: center;
  align-items: start;
  padding: 20px;
`;

const NoResultText = styled.div`
  font-size: 48px;
  margin-top: 10rem;
`
export default function Movies({ onMovieClick }: { onMovieClick: (movie: MovieType) => void }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<MovieType[]>([]);

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        try {
            if (newSearchTerm) {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${newSearchTerm}`);
                setSearchResults(response.data.results || []);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <PageContainer>
            <SearchBarContainer onSubmit={handleFormSubmit}>
                <SearchBarInput
                    type="text"
                    placeholder="Título o género"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <SearchIcon className="fa fa-search" aria-hidden="true" />
            </SearchBarContainer>
            <ResultContainer>
                {searchResults.length > 0 ? (
                    <>
                        {searchResults.map((movie) => (
                            <Link to={`/peliculas/${movie.id}`} key={movie.id} onClick={() => onMovieClick(movie)}>
                                <MovieCard movie={movie} />
                            </Link>
                        ))}
                    </>
                ) : (
                    <NoResultText>No results found</NoResultText>
                )}
            </ResultContainer>
        </PageContainer>
    );
};


