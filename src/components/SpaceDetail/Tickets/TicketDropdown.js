import React from "react";
import { Dropdown } from "react-bootstrap";
import { deleteTicket } from "../../../utils/deleteTicket";
import { NavLink } from "react-router-dom";

const TicketDropdown = ({ ticketId, getTickets, setTickets, spaceId }) => {
  const deleteTicketHandler = async () => {
    await deleteTicket(ticketId);
    await getTickets(spaceId, setTickets)
  };

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
        <Dropdown.Item onClick={() => deleteTicketHandler()}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TicketDropdown;
