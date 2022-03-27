import React from "react";
import { Dropdown } from "react-bootstrap";
import { deleteTicket } from "../../../utils/deleteTicket";


const TicketDropdown = ({ticketId, fetchTickets}) => {

    const deleteTicketHandler = (ticketId) => {
        deleteTicket(ticketId)
        fetchTickets()
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
      >
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item onClick={()=> deleteTicketHandler(ticketId)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TicketDropdown;
