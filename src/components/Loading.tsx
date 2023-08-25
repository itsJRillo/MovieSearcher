import styled from "styled-components";
import { mediaQueries } from "../types/mediaQueries";
import loadingIcon from '/loading.svg';

import { useTranslation } from "react-i18next";

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

const LoadingContainer = styled.div`
    display: flex;
    text-align: center;
    font-size: 45px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

export default function Loading() {
    const { t } = useTranslation();
    
    return <LoadingContainer>
        <Image src={loadingIcon} width={300} height={300} alt={`${t("loadingMessage")} svg`} />
        <span>{t("loadingMessage")}</span>
    </LoadingContainer>
}