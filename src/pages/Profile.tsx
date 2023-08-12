import { useState } from "react";
import styled from "styled-components";
import editIcon from "../../public/edit.png"

const DetailsContainer = styled.div`
  margin-top: 6rem;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f8b500;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
  background-color: #333;
  width: 25%;
  color: #fff;
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 20px;
  background-color: #555;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
`;

const RoundButton = styled.button`
  display: flex;
  align-items: center;
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

export default function Profile({ user }: { user: UserType | null }) {
  const [editing, setEditing] = useState(false);
  // const [editedEmail, setEditedEmail] = useState(user?.email);
  const [editedPassword, setEditedPassword] = useState(user?.password);

  const handleEditClick = () => {
    setEditing(true);
  };

  // const handleSaveClick = () => {
  //   setEditing(false);
  //   user.email = editedEmail;
  //   user.password = editedPassword;
  // };

  return (
    <div>
      <DetailsContainer>
        <h2>Detalles de la cuenta</h2>
        <Table>
          <tbody>
            <tr>
              <TableHeader>Nombre de usuario</TableHeader>
              <TableCell>
                {user?.username}
              </TableCell>
            </tr>
            <tr>
              <TableHeader>Correo</TableHeader>
              <TableCell>
                {user?.email}
              </TableCell>
            </tr>
            <tr>
              <TableHeader>Contraseña</TableHeader>
              <TableCell>
                {editing ? (
                  <input
                    type="password"
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                  />
                ) : (
                  "********"
                )}
                <RoundButton onClick={handleEditClick}>
                  <Image src={editIcon} alt="edit icon"/>
                </RoundButton>
              </TableCell>
            </tr>
          </tbody>
        </Table>
      </DetailsContainer>
    </div>
  );
}
