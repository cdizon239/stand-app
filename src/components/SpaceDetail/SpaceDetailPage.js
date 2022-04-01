import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SpaceDetailHeader from "./SpaceDetailHeader";
import SpaceBoard from "./SpaceBoard";
import { getTickets } from "../../utils/getTickets";
import { NewTicketModal } from "./NewTicketModal";
import {
  PlusCircleFill,
  DoorClosedFill,
  ArrowLeft,
} from "react-bootstrap-icons";
import { SpaceDetailButton } from "./styles";
import { getSpace } from "../../utils/getSpace";
import "./SpaceDetailPage.css";

export const SpaceDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [tickets, setTickets] = useState([]);
  const [space, setSpace] = useState();
  const [showNewTicketForm, setShowNewTicketForm] = useState();

  //  get space info on mount
  useEffect(() => {
    let fetchSpace = async () => {
      let spaceFetched = await getSpace(params.space_id);
      if (spaceFetched) {
        setSpace(spaceFetched);
      }
    };
    fetchSpace();
  }, []);

  useEffect(() => {
    getTickets(params.space_id, setTickets);
  }, [space]);

  return (
    <>
      {space && (
        <div>
          <div>
            <BackNavHeader>
              <BackDiv onClick={() => navigate(-1, { replace: true })}>
                <ArrowLeft className="fs-2" />
                <h5 style={{ margin: "0 15px" }}>Back</h5>
              </BackDiv>
              <div className="button-group">
                <SpaceDetailButton onClick={() => setShowNewTicketForm(true)}>
                  <PlusCircleFill style={{ marginRight: "5px" }} />
                  Create a ticket
                </SpaceDetailButton>
                <SpaceDetailButton
                  onClick={() => navigate(`/${space.id}/videoRoom`)}
                >
                  <DoorClosedFill style={{ marginRight: "5px" }} />
                  Enter a room
                </SpaceDetailButton>
              </div>
            </BackNavHeader>
            <SpaceDetailHeader space={space} />
            {tickets.length > 0 ? (
              <>
                {space?.privacy === "private" && (
                  <>
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
              <div>
                <PlusCircleFill onClick={() => setShowNewTicketForm(true)} className="fs-2"/>
                <h3>No tickets on this Space board yet</h3>
                <h5>Create a ticket and get started</h5>
              </div>
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
        </div>
      )}
    </>
  );
};

const BackNavHeader = styled.div`
  padding: 15px 50px;
  display: flex;
  justify-content: space-between;
`;

const BackDiv = styled.div`
  display: flex;
  align-items: center;
`;
