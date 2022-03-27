import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpacesList } from "./SpacesList";
import "./Spaces.css";
import styled from "styled-components";
import { NewSpaceModal } from "./NewSpaceModal";
import { getSpaces } from "../../utils/getSpaces";
import { getUsers } from "../../utils/getUsers";

const StyledButton = styled.button`
  border-radius: 25px;
  border: none;
  background: rgba(69, 61, 121, 1);
  min-height: 50px;
  color: white;
  font-weight: 500;
  padding: 0 2%;
  position: fixed;
  bottom: 30px;
  right: 30px;
`;
const buttonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
`;

export const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();
  const [showNewSpaceForm, setShowNewSpaceForm] = useState();
  const [users, setUsers] = useState([]);

  const handleShowNewSpaceForm = () => setShowNewSpaceForm(true);

  //  on mount, grab all spaces
  useEffect(() => {
    let fetchSpaces = async () => {
      let allSpaces = await getSpaces(setSpaces);
      if (allSpaces.status === 302) navigate("/login");
    };

    fetchSpaces();
  }, []);

  useEffect(() => {
    let fetchUsers = async () => {
      let allUsers = await getUsers();
      if (allUsers) {
        console.log(allUsers);
        setUsers(allUsers.data);
      }
    };
    fetchUsers()
  }, []);

  return (
    <>
      <div className="">
        <h1>Spaces</h1>
      </div>
      <div className="spaces-list-wrapper">
        {spaces && <SpacesList spaces={spaces} />}
      </div>
      {users && (
        <NewSpaceModal
          showNewSpaceForm={showNewSpaceForm}
          setShowNewSpaceForm={setShowNewSpaceForm}
          usersInfo={users}
          getSpaces={getSpaces}
          setSpaces={setSpaces}
        />
      )}
      <StyledButton onClick={handleShowNewSpaceForm}>
        Create a Space
      </StyledButton>
    </>
  );
};
