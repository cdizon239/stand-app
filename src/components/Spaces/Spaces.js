import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpacesList } from "./SpacesList";
import "./Spaces.css";
import styled from "styled-components";
import { NewSpaceModal } from "./NewSpaceModal";
import { getSpaces } from "../../utils/getSpaces";
import { getUsers } from "../../utils/getUsers";

export const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();
  const [showNewSpaceForm, setShowNewSpaceForm] = useState(false);
  const [users, setUsers] = useState();

  const handleShowNewSpaceForm = () => {
    setShowNewSpaceForm(true);
  };

  //  on mount, grab all spaces
  useEffect(() => {
    let fetchSpaces = async () => {
      let spacesFetched = await getSpaces();
      if (spacesFetched) {
        setSpaces(spacesFetched);
      }
    };
    fetchSpaces();
  }, []);

  useEffect(() => {
    let fetchUsers = async () => {
      let allUsers = await getUsers();
      if (allUsers) {
        setUsers(allUsers);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {spaces && (
        <SpacesPageWrapper>
          <AllSpacesHeaderWrapper>
            <h1>Spaces</h1>
          </AllSpacesHeaderWrapper>
          <div className="spaces-list-wrapper">
            {spaces && <SpacesList spaces={spaces} />}
          </div>
          {users && (
            <NewSpaceModal
              showNewSpaceForm={showNewSpaceForm}
              setShowNewSpaceForm={setShowNewSpaceForm}
              usersInfo={users}
              // getSpaces={getSpaces}
              setSpaces={setSpaces}
            />
          )}
          <StyledButton onClick={handleShowNewSpaceForm}>
            Create a Space
          </StyledButton>
        </SpacesPageWrapper>
      )}
    </>
  );
};

const SpacesPageWrapper = styled.div`
  padding-bottom: 100px;
`;
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

const AllSpacesHeaderWrapper = styled.div`
  padding: 15px 50px;
`;
