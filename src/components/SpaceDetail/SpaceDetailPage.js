import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SpaceDetailHeader from "./SpaceDetailHeader";
import SpaceBoard from "./SpaceBoard";
import { getTickets } from "../../utils/getTickets";
import { NewTicketModal } from "./NewTicketModal";
import { PlusCircleFill, BoxArrowInRight, ArrowLeft } from "react-bootstrap-icons";
import { SpaceDetailButton } from "./styles";
import { getSpace } from "../../utils/getSpace";


export const SpaceDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [tickets, setTickets] = useState([]);
  const [space, setSpace] = useState();
  const [showNewTicketForm, setShowNewTicketForm] = useState();

  // const fetchTickets = () => {
  //   getTickets(params.space_id, setTickets);
  //   // if (fetchedTickets) {
  //   //   setTickets(fetchedTickets);
  //   // }
  // };

  //  get space info on mount
  useEffect(() => {
    getSpace(params.space_id, setSpace);
  }, []);

  useEffect(() => {
    getTickets(params.space_id, setTickets);
  }, [space]);

  return (
    <>
      {space && (
        <div>
          <div>
            <BackNavHeader onClick={() => navigate(-1, { replace: true })}>
              <ArrowLeft className="fs-2" />
              <h5 style={{ margin: "0 15px" }}>Back</h5>
            </BackNavHeader>
            <SpaceDetailHeader space={space} />
            <SpaceDetailButton
              onClick={() => navigate(`/${space.id}/videoRoom`)}
            >
              <BoxArrowInRight style={{ marginRight: "5px" }} />
              Enter a room
            </SpaceDetailButton>
            {tickets.length > 0 ? (
              <>
                {space?.privacy === "private" && (
                  <>
                    <SpaceDetailButton
                      onClick={() => setShowNewTicketForm(true)}
                    >
                      <PlusCircleFill style={{ marginRight: "5px" }} />
                      Create a ticket
                    </SpaceDetailButton>
                    <SpaceBoard
                      tickets={tickets}
                      setShowNewTicketForm={setShowNewTicketForm}
                      getTickets={getTickets}
                      setTickets={setTickets}
                      spaceId={space.id}
                    />
                  </>
                )}
              </>
            ) : (
              <PlusCircleFill onClick={() => setShowNewTicketForm(true)} />
            )}
            <NewTicketModal
              showNewTicketForm={showNewTicketForm}
              setShowNewTicketForm={setShowNewTicketForm}
              spaceMembers={space.members.map((member) => member.user)}
              getTickets={getTickets}
              setTickets={setTickets}
              spaceId={space.id}
            />
          </div>
          {/* <div>
            <VideoChat />
          </div> */}
        </div>
      )}
    </>
  );
};

const BackNavHeader = styled.div`
  width: 80vw;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledButton = styled.button`
  border-radius: 25px;
  border: none;
  background: rgba(69, 61, 121, 1);
  min-height: 50px;
  color: white;
  font-weight: 500;
  padding: 0 2%;
`;

