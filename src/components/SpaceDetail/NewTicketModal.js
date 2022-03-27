import React, { useEffect, useState } from "react";
import { Modal, Button, Form, FormGroup, Image } from "react-bootstrap";
import { createTicket } from "../../utils/createTicket";
import Select from "react-select";
import styled from "styled-components";

const Avatar = styled(Image)`
  height: 25px;
`;

export const NewTicketModal = ({
  showNewTicketForm,
  setShowNewTicketForm,
  spaceMembers,
  getTickets,
  setTickets,
  spaceId
}) => {
    const [ticketInfo, setTicketInfo] = useState()
    

  const handleClose = () => setShowNewTicketForm(false);
  
  const handleFormChange = (name, value) => {
      setTicketInfo({
          ...ticketInfo,
          [name] : value
      })

  };

  const handleFormSubmit = async () => {
      createTicket(spaceId, ticketInfo)
      getTickets(spaceId)
      setShowNewTicketForm(false)
  }

  const statusOptions = [
    { value: "To do", label: "To do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Blocked", label: "Blocked" },
    { value: "Done", label: "Done" },
  ];

  const membersDropdown = spaceMembers.map((user) => {
    return {
      value: user.id,
      label: (
        <div>
          <Avatar
            src={user.img_url}
            referrerPolicy="no-referrer"
            roundedCircle
          />
          {user.name}
        </div>
      ),
    };
  });

  //    handle create space button: make a request to create a space
  return (
    <>
      <Modal show={showNewTicketForm} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3> New ticket</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ticket</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write the ticket"
                name="title"
                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add a ticket description"
                name="description"
                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
              />
            </Form.Group>
            <FormGroup>
              <Form.Label>Ticket Status</Form.Label>
              <Select
                options={statusOptions}
                name="status"
                onChange={(target, action) => {
                  handleFormChange(action.name, target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Assignee</Form.Label>
              <Select
                options={membersDropdown}
                name="assignee"
                onChange={(target, action) => {
                  handleFormChange(action.name, target.value);
                }}
              />
            </FormGroup>
          </Form>
          <Button variant="primary" onClick={handleFormSubmit}>
            Create Ticket
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
