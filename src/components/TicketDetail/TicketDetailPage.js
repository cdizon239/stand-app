import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TicketDetailPage = () => {
  const params = useParams();
  const [ticket, setTicket] = useState();

  //  grab the ticket
  const getTicket = async () => {
    let ticketToFetch = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/tickets/" + params.ticket_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let jsonTicket = await ticketToFetch.json();

    if (jsonTicket) {
      setTicket(jsonTicket.data);
    }
  };

  return (
    <>
    <div> Back button</div>
      <div>TicketDetailPage</div>
      <div>
        <div>Ticket Area</div>
        <div> Comment area</div>
      </div>
    </>
  );
};

export default TicketDetailPage;
