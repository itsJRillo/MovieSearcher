import styled from "styled-components";
import emptyListIcon from "/assets/emptyList.png";

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
  return (
    <EmptyListContainer>
      <EmptyListImage src={emptyListIcon} alt="empty list icon" />
      <EmptyListTitle>Mi lista está vacía</EmptyListTitle>
      <EmptyListText>El contenido que añadas a Mi lista aparecerá aquí</EmptyListText>
    </EmptyListContainer>
  );
}
