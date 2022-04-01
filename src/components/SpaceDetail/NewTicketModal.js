import React, { useEffect, useState } from "react";
import { Modal, Button, Form, FormGroup, Image } from "react-bootstrap";
import { createTicket } from "../../utils/createTicket";
import { getTickets } from "../../utils/getTickets";
import Select from "react-select";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const NewTicketModal = ({
  showNewTicketForm,
  setShowNewTicketForm,
  spaceMembers,
  setTickets,
  spaceId,
}) => {
  const navigate = useNavigate();
  const [ticketInfo, setTicketInfo] = useState({
    status: 'To do'
  });
  const [formErrors, setFormErrors] = useState();

  const requiredFieldsCheck = () => {
    let newErrors = {};
    if (!ticketInfo["title"] || ticketInfo["title"] === "")
      newErrors["title"] = "Ticket name cannot be empty.";
    return newErrors;
  };

  const handleClose = () => setShowNewTicketForm(false);

  const handleFormChange = (name, value) => {
    //  change to a callback format
    setTicketInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const ticketFormErrors = requiredFieldsCheck();

    if (Object.keys(ticketFormErrors).length > 0) {
      setFormErrors(ticketFormErrors);
    } else {
      let createdTicket = await createTicket(
        spaceId,
        ticketInfo,
        setShowNewTicketForm
      );
      let ticketsFetched = await getTickets(spaceId);
      if (ticketsFetched) {
        setTickets(ticketsFetched);
        navigate(`/space/${spaceId}`);
      }
    }
  };

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
          <h3> Create a new ticket</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ticket name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write the ticket"
                name="title"
                onChange={(e) =>
                  handleFormChange(e.target.name, e.target.value)
                }
                isInvalid={!!formErrors?.title}
              />
              <Form.Control.Feedback type='invalid'>
                {formErrors?.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add a ticket description"
                name="description"
                onChange={(e) =>
                  handleFormChange(e.target.name, e.target.value)
                }
              />
            </Form.Group>
            <FormGroup className="mb-3">
              <Form.Label>Ticket Status</Form.Label>
              <Select
                options={statusOptions}
                name="status"
                onChange={(target, action) => {
                  handleFormChange(action.name, target.value);
                }}
                defaultValue={ { value: "To do", label: "To do" }}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
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
          <div style={{ width: "100%", display: "flex" }}>
            <StyledButton onClick={handleFormSubmit}>
              Create Ticket
            </StyledButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const StyledButton = styled.button`
  border-radius: 25px;
  border: none;
  background: rgba(69, 61, 121, 1);
  min-height: 50px;
  color: white;
  font-weight: 500;
  padding: 0 2em;
  margin: 1em auto;
`;

const Avatar = styled(Image)`
  height: 25px;
  margin-right: 10px;
`;
