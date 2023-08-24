import PocketBase from 'pocketbase';
import { useState } from "react";
import styled from "styled-components";
import userIcon from "/user.png";
import { ToastContainer, toast } from 'react-toastify';

const PageContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 1rem 0;
`;

const ChangeImageButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f8b500;
  color: #fff;
  border: none;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const DetailsContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;
  
const Divider = styled.hr`
  width: 75%;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #f8b500, #333, #f8b500);
`
  
const ProfileDetails = styled.p`
  font-size: 18px;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 30px;
  color: #000
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SaveButton = styled.button`
  background-color: #f8b500;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Profile() {
  const pb = new PocketBase('https://shoten-api.pockethost.io');

  const [editing, setEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(pb.authStore.model?.username || "");
  const [editedEmail, setEditedEmail] = useState(pb.authStore.model?.email || "");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleProfilePictureUpload = (event: any) => {
    console.log(event);
    
    // const imageFile = event.target.files[0];
    // Handle image upload logic here
  };

  const handleSaveClick = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!editedUsername || !editedEmail) {
      setEditedEmail("")
      setEditedUsername("")
      toast.error("Por favor, completa todos los campos", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    try {
      // lOGIC TO EDIT WITH POCKETBASE
    } catch (error: any) {
      toast.error(error.response ? error.response.message : "Error desconocido", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }

    setEditing(false);
    setUnsavedChanges(false);
  };

  return (
    <div style={{ padding: "3rem" }}>
      <PageContainer>
        <ProfileInfoContainer>
          <ChangeImageButton>
            <img src="/edit.png" alt="edit icon" width={20} height={20}/>
            <input type="file" accept="image/*" onChange={handleProfilePictureUpload} style={{ display: "none" }} />
          </ChangeImageButton>
          <ProfileImage src={userIcon} alt="Profile" />          
        </ProfileInfoContainer>
        <DetailsContainer>
          {editing ? (
            <EditForm onSubmit={handleSaveClick}>
              <SaveButton type="submit" disabled={!unsavedChanges}>
                Guardar
              </SaveButton>
            </EditForm>
          ) : (
            <div style={{backgroundColor: "#f8b500", padding: "2rem", borderRadius:"30px"}}>
              <ProfileDetails>Nombre de usuario <Divider/> <span style={{color: "#fff"}}>{pb.authStore.model?.username}</span></ProfileDetails>
              <br />
              <ProfileDetails>Correo <Divider/> <span style={{color: "#fff"}}>{pb.authStore.model?.email}</span></ProfileDetails>
            </div>
          )}
        </DetailsContainer>
        <ToastContainer />
      </PageContainer>
    </div>
  );
}
