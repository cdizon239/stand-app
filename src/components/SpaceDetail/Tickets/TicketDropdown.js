import React from "react";
import { Dropdown } from "react-bootstrap";
import { deleteTicket } from "../../../utils/deleteTicket";
import { NavLink } from "react-router-dom";
import { getTickets } from "../../../utils/getTickets";

const TicketDropdown = ({ ticketId, setTickets, spaceId }) => {
  const deleteTicketHandler = async () => {
    await deleteTicket(ticketId);
    let ticketsFetched = await getTickets(spaceId)
    if (ticketsFetched) {
      setTickets(ticketsFetched)
    }
  };

  const handleTicketArchive = async () => {
    let archiveTicket = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/v1/tickets/" +
        ticketId+
        "/edit",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          is_archived: true
        }),
      }
    );
    let ticketsFetched = await getTickets(spaceId)
    if (ticketsFetched) {
      setTickets(ticketsFetched)
    }
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-button-dark-example1"
        style={{
          background: "none",
          border: "none",
          float: "right",
        }}
      ></Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href={`/ticket/${ticketId}`}>View</Dropdown.Item>
        <Dropdown.Item onClick={() =>handleTicketArchive()}>
          Archive
        </Dropdown.Item>
        <Dropdown.Item onClick={() => deleteTicketHandler()}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TicketDropdown;
