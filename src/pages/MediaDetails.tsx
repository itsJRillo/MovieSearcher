import { useEffect, useState } from "react";
import styled from "styled-components";

import loadingIcon from '/loading.svg';
import { mediaQueries } from "../types/mediaQueries";

interface MediaDetailsProps {
    media: MovieType | SerieType | undefined;
    language: string;
}

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 20px;

    ${mediaQueries("md")`
        margin-bottom: 4rem;
        flex-direction: row;
        align-items: flex-start;
    `}
`;

const Title = styled.h2`
    margin: 0;
    text-align: center;
    font-size: 2rem;

    ${mediaQueries("md")`
        font-size: 2.5rem;
    `}
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    ${mediaQueries("lg")`
        width: 150px;
        height: 150px;
        `
    }
`;

const Filter = styled.div`
    background: none;
    color: inherit;
    border: white solid 3px;
    border-radius: 50px;
    padding: 5px .8rem;
    font: inherit;
    font-size: 12px;
    font-weight: bold;
    outline: inherit;
    background-color: #121212;
`;

const FiltersContainer = styled.div`
    display: flex;
    text-align: center;
    gap: 0.5rem;
`;

const ProductionContainer = styled.div`
    display: flex;
    text-align: center;
    gap: 0.5rem;
`;

const LoadingContainer = styled.div`
    display: flex;
    text-align: center;
    font-size: 45px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const PosterContainer = styled.div`
    margin-top: 5rem;
    position: relative;
    justify-content: flex-end;
    width: 100%;
    height: 500px;
    background-position: center;
    object-fit: cover;
`;

const TitleImageContainer = styled.div`
    margin-top: auto;
    width: 100%;
    max-width: 600px;
    margin-left: 3rem;
`;

const TitleImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-top: 15rem;
`;

const OverviewContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    max-width: 50%;
    margin: 3rem 2rem 2rem 3rem;
    gap: 1rem;
    color: white;
    font-size: 1rem;
    line-height: 1.5;
`;

const MediaDetails = ({ media, language }: MediaDetailsProps) => {
    const isMovieType = media?.type === "movie";
    const [details, setDetails] = useState<MovieDetails | TVDetails | undefined>();

    const [listImages, setListImages] = useState<JSONImageType[]>([]);
    const [titleImage, setTitleImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const handleDetailsMedia = async () => {
        const type = isMovieType ? "movie" : "tv";
        const apiKey = import.meta.env.VITE_API_KEY;

        try {
            const fetchDetails = await fetch(
                `https://api.themoviedb.org/3/${type}/${media?.id}?language=${language}&api_key=${apiKey}`
            );

            const fetchImages = await fetch(
                `https://api.themoviedb.org/3/${type}/${media?.id}/images?language=${language}`,
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_API_AUTH
                    }
                }
            );

            const detailsJSON = await fetchDetails.json();
            const imagesJSON = await fetchImages.json();

            setDetails({
                type: type,
                ...detailsJSON,
            });

            const filteredImages = imagesJSON.logos
                .map((image: any) => image.file_path);

            if (filteredImages.length > 0) {
                const imagePath = filteredImages[0];
                setTitleImage(imagePath);
            }

            setLoading(false)
        } catch (error) {
            console.error("Error fetching media details:", error);
        }
    };

    useEffect(() => {
        if (media) {
            handleDetailsMedia();
        }
    }, [media, language]);

    if (!media || !details) {
        return (
            <LoadingContainer>
                <Image src={loadingIcon} width={300} height={300} alt="Loading" />
                <span>Loading...</span>
            </LoadingContainer>
        );
    }

    return (
        <MovieContainer>
            <PosterContainer style={{
                backgroundImage: `linear-gradient(to top, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0.5)), url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
            }}>
                <TitleImageContainer>
                    <TitleImage
                        src={`https://image.tmdb.org/t/p/original/${titleImage}`}
                        alt={`${details.type === "movie" ? details.title : (details as TVDetails).name}`}
                    />
                </TitleImageContainer>
                <OverviewContainer>
                {details.genres.map((res: any) => (
                        <Filter key={res.id}>{res.name}</Filter>
                    ))}
                </OverviewContainer>
                <OverviewContainer>
                    {details.overview}
                </OverviewContainer>
            </PosterContainer>
            {/* <div className="media-details-info">
                <div className="media-details-rating">
                    <Title>{details.type === "movie" ? details.title : (details as TVDetails).name}</Title>
                    <svg
                        className="vote-icon"
                        style={{ fill: "#f9cc6c" }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                    >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                    {Math.round(details.vote_average)}
                </div>
                <p className="media-details-overview">{details.overview}</p>
                <FiltersContainer>
                    {details.genres.map((res: any) => (
                        <Filter key={res.id}>{res.name}</Filter>
                    ))}
                </FiltersContainer>
                <ProductionContainer>
                    {details.production_companies.map((res: any) => (
                        <div>
                            <Image src={`https://image.tmdb.org/t/p/original/${res.logo_path}`} />
                        </div>
                    ))}
                </ProductionContainer>
            </div> */}
        </MovieContainer>
    );
};

export default MediaDetails;
