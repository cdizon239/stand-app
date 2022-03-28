import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SpaceDetailHeader from "./SpaceDetailHeader";
import SpaceBoard from "./SpaceBoard";
import { getTickets } from "../../utils/getTickets";
import { NewTicketModal } from "./NewTicketModal";
import { PlusCircleFill } from "react-bootstrap-icons";
import { VideoChat } from "../Video/VideoChat";
import { CreateTicketButton } from "./styles";
import { getSpace } from "../../utils/getSpace";

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
  const [tickets, setTickets] = useState([]);
  const [space, setSpace] = useState();
  const [showNewTicketForm, setShowNewTicketForm] = useState();

  const fetchTickets = async () => {
    let fetchedTickets = await getTickets(space?.id);
    if (fetchedTickets) {
      setTickets(fetchedTickets);
    }
  };

  //  get space info on mount
  useEffect(() => {
    getSpace(params.space_id, setSpace);
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [space]);

  return (
    <>
      {space && (
        <div>
          <SpaceDetailHeader space={space} />
          {tickets.length > 0 ? (
            <>
              <CreateTicketButton onClick={() => setShowNewTicketForm(true)}>
                <PlusCircleFill style={{ marginRight: "5px" }} />
                Create a ticket
              </CreateTicketButton>
              <SpaceBoard
                tickets={tickets}
                setShowNewTicketForm={setShowNewTicketForm}
                fetchTickets={fetchTickets}
              />
            </>
          ) : (
            <PlusCircleFill onClick={() => setShowNewTicketForm(true)} />
          )}
          <NewTicketModal
            showNewTicketForm={showNewTicketForm}
            setShowNewTicketForm={setShowNewTicketForm}
            spaceMembers={space.members.map((member) => member.user)}
            fetchTickets={fetchTickets}
            spaceId={space.id}
          />
          <VideoChat />
        </div>
      )}
    </>
  );
};
