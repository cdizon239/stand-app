import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SpaceDetailHeader from "./SpaceDetailHeader";
import SpaceBoard from "./SpaceBoard";
import { getTickets } from "../../utils/getTickets";
import { NewTicketModal } from "./NewTicketModal";

const StyledButton = styled.button`
  border-radius: 25px;
  border: none;
  background: rgba(69, 61, 121, 1);
  min-height: 50px;
  color: white;
  font-weight: 500;
  padding: 0 2%;
`;

export const SpaceDetailPage = () => {
  const params = useParams();
  const [tickets, setTickets] = useState();
  const [space, setSpace] = useState();
  const [showNewTicketForm, setShowNewTicketForm] = useState()

  const getSpace = async () => {
    let spaceToFetch = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/spaces/" + params.space_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let jsonSpace = await spaceToFetch.json();

    if (jsonSpace) {
      console.log(jsonSpace.data.members[0].user);
      setSpace(jsonSpace.data);
    }
  };

  useEffect(() => {
    getSpace();
  }, []);

  useEffect(() => {
    space && getTickets(setTickets, space.id)
  }, [space])

  return (
    <>
      {space && (
        <div>
          <SpaceDetailHeader space={space} />
          { tickets && <SpaceBoard space={space} tickets={tickets} setShowNewTicketForm={setShowNewTicketForm}/>}
          <NewTicketModal showNewTicketForm={showNewTicketForm} setShowNewTicketForm={setShowNewTicketForm} spaceMembers={
            space.members.map(member => member.user)
          }/>

        </div>
      )}
    </>
  );
};
