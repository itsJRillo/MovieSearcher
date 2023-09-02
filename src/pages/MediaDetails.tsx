import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import Carousel from "react-multi-carousel";
import { useTranslation } from "react-i18next";

interface MediaDetailsProps {
    media: MovieType | SerieType | undefined;
    language: string;
}

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 20px;
    background-color: #121212
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
`

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
    width: 60%;
    height: 60%;
    object-fit: contain;
    margin-top: 15rem;
`;

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 20%;
    margin: 3rem 2rem 2rem 3rem;
    gap: 1rem;
    color: white;
    font-size: 1rem;
    line-height: 1.5;
    
    @media (max-width: 600px) {
        margin: 2rem 1rem 1rem 2rem;
        max-width: 100%;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
`;

const OverviewContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    max-width: 35%;
    margin: 3rem 2rem 2rem 3rem;
    gap: 1rem;
    color: white;
    font-size: 1rem;
    line-height: 1.5;
    @media (max-width: 600px) {
        max-width: 70%;
    }
`;

const Menu = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 6rem;
    font-size: 1.2rem;
    position: relative;
    @media (max-width: 600px) {
        margin-top: calc(70% + 1rem);
        top: -3rem;
    }
`;

const VideoContainer = styled.div`
    width: 100%;
    gap: 3rem;
    text-align: center;
`;

const Iframe = styled.iframe`
    width: 100%;
    max-width: 800px;
    height: 350px;
    border: none;
`;


const MenuItem = styled.div`
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
    border-bottom: 2px solid white;
`;

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1600 },
        items: 5,
        partialVisibilityGutter: 40,
    },
    desktop: {
        breakpoint: { max: 1600, min: 1024 },
        items: 4,
        partialVisibilityGutter: 30,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        partialVisibilityGutter: 20,
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        partialVisibilityGutter: 100,
    },
};

const MediaDetails = ({ media, language }: MediaDetailsProps) => {
    const isMovieType = media?.type === "movie";
    const [details, setDetails] = useState<MovieDetails | TVDetails | undefined>();
    const [videos, setVideos] = useState<VideoType[]>();
    const [selectedType, setSelectedType] = useState("trailers");

    const [titleImage, setTitleImage] = useState<string | null>(null);
    const [, setLoading] = useState<boolean>(true);

    const { t } = useTranslation();

    const handleDetailsMedia = async () => {
        const type = isMovieType ? "movie" : "tv";
        const apiKey = import.meta.env.VITE_API_KEY;

        const fetchVideos = await fetch(
            `https://api.themoviedb.org/3/${type}/${media?.id}/videos?language=${language}&api_key=${apiKey}`,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: import.meta.env.VITE_API_AUTH
                }
            }
        );

        const fetchDetails = await fetch(
            `https://api.themoviedb.org/3/${type}/${media?.id}?language=${language}&api_key=${apiKey}`,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: import.meta.env.VITE_API_AUTH
                }
            }
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
        const videosJSON = await fetchVideos.json();

        setDetails({
            type: type,
            ...detailsJSON,
        });

        const teaserVideos = videosJSON.results.filter((video: VideoType) => {
            return video.type === 'Trailer' || video.type === 'Teaser';
        });

        setVideos(teaserVideos);

        const filteredImages = imagesJSON.logos.map((image: any) => image.file_path);

        if (filteredImages.length > 0) {
            const imagePath = filteredImages[0];
            setTitleImage(imagePath);
        }

        setLoading(false);
    };


    const handleMenuItemClick = (type: string) => {
        setSelectedType(type);
    };

    const filteredVideos = videos?.filter((video: VideoType) => {
        if (selectedType === "trailers") {
            return video.type === "Trailer";
        } else if (selectedType === "teasers") {
            return video.type === "Teaser";
        }

        return true;
    });

    useEffect(() => {
        if (media) {
            handleDetailsMedia();
        }
    }, [media, language]);

    if (!media || !details) {
        return (
            <Loading />
        );
    }

    return (
        <MovieContainer>
            <PosterContainer style={{
                backgroundImage: `linear-gradient(to top, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0.5)), url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
                backgroundRepeat: 'no-repeat',
            }}>
                <TitleImageContainer>
                    <TitleImage
                        src={`https://image.tmdb.org/t/p/original/${titleImage}`}
                        alt={`${details.type === "movie" ? details.title : (details as TVDetails).name}`}
                    />
                </TitleImageContainer>
                <FilterContainer>
                    {details.genres.map((res: any) => (
                        <Filter key={res.id}>{res.name}</Filter>
                    ))}
                </FilterContainer>
                <OverviewContainer>
                    {details.overview}
                </OverviewContainer>
            </PosterContainer>

            <Menu>
                <MenuItem
                    onClick={() => handleMenuItemClick("trailers")}
                >
                    Trailers
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick("teasers")}
                >
                    Teasers
                </MenuItem>
            </Menu>

            <VideoContainer>
                <h2>{selectedType === "trailers" ? "Trailers" : "Teasers"}</h2>
                {filteredVideos && filteredVideos.length > 0 ? (
                    <Carousel
                        responsive={responsive}
                        customTransition="transform 500ms ease-in-out"
                    >
                        {filteredVideos?.slice(0, 4).map((video: VideoType) => (
                            <div key={video.id}>
                                <h3>{video.name}</h3>
                                <Iframe
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    allowFullScreen
                                />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <>
                        {selectedType === "trailers" ? (<p>
                            {t("trailerNoAvailable")}
                        </p>) : (<p>
                            {t("teaserNoAvailable")}
                        </p>)}
                    </>
                )}
            </VideoContainer>
        </MovieContainer>
    );
};

export default MediaDetails;
