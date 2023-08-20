import React, { useEffect, useState } from 'react';
import '../styles/fullWidthCard.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface FullWidthCardProps {
    media: MovieType | SerieType,
    lan: string
}

const CardContainer = styled.div`
    margin-top: 5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    background-size: cover;
    background-position: center;
    height: 30rem;
`;

const TitleImageContainer = styled.div`
    margin-top: auto;
    width: 100%;
    max-width: 600px;
    margin-left: 3rem;
`;

const TitleImage = styled.img`
    width: 65%;
    height: 65%;
    object-fit: contain;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
`;

const OverviewContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 50%;
    margin-left: 3rem;
    color: white;
    font-size: 1rem;
    line-height: 1.5;
    gap: 3rem;
    margin-bottom: 2rem;
`;

const DetailsButton = styled(motion.button)`
    margin-top: 1rem;
    border-radius: 10px;
    padding: 3rem;
    height: 50px;
    width: 275px;
    background-color: #f8b500;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
`;

const FullWidthCard: React.FC<FullWidthCardProps> = ({ media, lan }) => {
    const [listImages, setListImages] = useState<JSONImageType[]>([]);
    const [widestImage, setWidestImage] = useState<string>("");
    const [titleImage, setTitleImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const handleFullWidthImages = async () => {
        setLoading(true);

        const fetchImages = await fetch(`https://api.themoviedb.org/3/movie/${media.id}/images?language=${lan}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: import.meta.env.VITE_API_AUTH
            }
        });

        const imagesJSON = await fetchImages.json();

        setListImages(imagesJSON);

        const filteredBackdrops = imagesJSON.posters.map((image: any) => image.file_path);

        if (filteredBackdrops.length > 0) {
            const imagePath = filteredBackdrops[0];
            setWidestImage(imagePath);
        }

        const filteredTitles = imagesJSON.logos.map((image: any) => image.file_path);

        if (filteredTitles.length > 0) {
            const imagePath = filteredTitles[0];
            setTitleImage(imagePath);
        } else {
            setTitleImage('');
        }

        setLoading(false);

    };

    useEffect(() => {
        handleFullWidthImages();
        console.log(loading);
        console.log(listImages);
        
    }, []);

    const variants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <div className="full-width-card">
            <CardContainer
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0.5)), url(https://image.tmdb.org/t/p/original/${widestImage})`,
                }}
            >
                <TitleImageContainer>
                    <TitleImage
                        src={`https://image.tmdb.org/t/p/original/${titleImage}`}
                        alt={`${media.type === "movie" ? media.title : ""}`}
                    />
                </TitleImageContainer>
                <OverviewContainer>
                    {media.overview}
                    <DetailsButton variants={variants} whileHover="hover">Más info</DetailsButton>
                </OverviewContainer>
            </CardContainer>
        </div>
    );
};

export default FullWidthCard;
