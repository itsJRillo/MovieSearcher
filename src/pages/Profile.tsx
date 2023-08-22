import { useState } from "react";
import styled from "styled-components";
import editIcon from "/edit.png";

const DetailsContainer = styled.div`
  margin-top: 4rem;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(248, 181, 0, 0.3);
`;

const RoundButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8b500;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 18px;
  height: 18px;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileInfo = styled.div`
  margin-left: 1rem;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  margin-bottom: 0.5rem;
`;

const ProfileDetail = styled.p`
  font-size: 18px;
  margin-bottom: 0.5rem;
`;

export default function Profile({ user }: { user: UserType | null }) {
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <div style={{padding: "3rem"}}>
      <DetailsContainer>
        <h2>Detalles de la cuenta</h2>
        <ProfileContent>
          <RoundButton onClick={handleEditClick}>
            <Image src={editIcon} alt="Edit" />
          </RoundButton>
          <ProfileInfo>
            <ProfileName>{user?.username}</ProfileName>
            <ProfileDetail>Correo electrónico: {user?.email}</ProfileDetail>
            {editing && (
              <>
                {/* Editing form fields go here */}
              </>
            )}
          </ProfileInfo>
        </ProfileContent>
      </DetailsContainer>
      </div>
  );
}
