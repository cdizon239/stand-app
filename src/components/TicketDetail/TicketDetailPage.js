import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import { Form, FormGroup, Image, Button } from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";
import { getTicket } from "../../utils/getTicket";
import {
  TicketAndCommentsWrapper,
  TicketDetailPageWrapper,
  TicketArea,
  CommentArea,
} from "./styles";

const Avatar = styled(Image)`
  height: 25px;
  margin: 0 15px;
`;

const WriteCommentBox = styled.div`
display: flex;
justify-content: stretch
`

const TicketDetailPage = () => {
  const params = useParams();
  const [ticket, setTicket] = useState();
  const [spaceMembers, setSpaceMembers] = useState();
  const [spaceId, setSpaceId] = useState();
  const [comment, setComment] = useState()
  const [comments, setComments] = useState()

  //    grab ticket on mount
  useEffect(() => {
    getTicket(params.ticket_id, setTicket, setSpaceId, setSpaceMembers);
  }, []);

  useEffect(() => {
      console.log(ticket);
  }, [ticket])

  //   form change handlers
  const handleTicketInfoChange = (name, value) => {
    setTicket({
      ...ticket,
      [name]: value,
    });
  };

  const handleTicketUpdateSubmit = async (e) => {
    console.log(ticket);
    e.preventDefault();
    const { title, description, status, assignee } = ticket;

    let editTicket = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/v1/tickets/" +
        ticket.id +
        "/edit",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          description: description,
          status: status,
          assignee: assignee.id,
        }),
      }
    );
  };

  

  const statusOptions = [
    { value: "To do", label: "To do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Blocked", label: "Blocked" },
    { value: "Done", label: "Done" },
  ];

  const membersDropdown = spaceMembers?.map((member) => {
    console.log(member);
    return {
      value: member.user.id,
      label: (
        <div>
          <Avatar
            src={member.user.img_url}
            referrerPolicy="no-referrer"
            roundedCircle
          />
          {member.user.name}
        </div>
      ),
    };
  });

  return (
    <>
      {ticket && (
        <TicketDetailPageWrapper>
          <div>
            <ArrowLeft className="fs-2" />
          </div>
          <div>
            <h1>{ticket.title}</h1>
          </div>
          <TicketAndCommentsWrapper>
            <TicketArea>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Ticket</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Write the ticket"
                    name="title"
                    defaultValue={ticket.title}
                    onChange={(e) =>
                        handleTicketInfoChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add a ticket description"
                    name="description"
                    defaultValue={ticket.description}
                    onChange={(e) =>
                        handleTicketInfoChange(e.target.name, e.target.value)
                    }
                  />
                </Form.Group>
                <FormGroup>
                  <Form.Label>Ticket Status</Form.Label>
                  <Select
                    options={statusOptions}
                    name="status"
                    defaultValue={{
                      value: ticket.status,
                      label: ticket.status,
                    }}
                    onChange={(target, action) => {
                        handleTicketInfoChange(action.name, target.value);
                    }}
                  />
                </FormGroup>
                {spaceMembers && (
                  <FormGroup>
                    <Form.Label>Assignee</Form.Label>
                    <Select
                      options={membersDropdown}
                      name="assignee"
                      defaultValue={{
                        value: ticket.assignee.id,
                        label: (
                          <div>
                            <Avatar
                              src={ticket.assignee.img_url}
                              referrerPolicy="no-referrer"
                              roundedCircle
                            />
                            {ticket.assignee.name}
                          </div>
                        ),
                      }}
                      onChange={(target, action) => {
                        handleTicketInfoChange(action.name, target.value);
                      }}
                    />
                  </FormGroup>
                )}
              </Form>
              <Button variant="primary" onClick={handleTicketUpdateSubmit}>
                Save
              </Button>
            </TicketArea>
            <CommentArea>
              <p>Comments</p>
              <WriteCommentBox>
                <Avatar
                  src={localStorage.getItem("loggedInUserAvatar")}
                  referrerPolicy="no-referrer"
                  roundedCircle
                />
                <Form>
                <Form.Control as="textarea" rows={3} />
                </Form>
              </WriteCommentBox>
            </CommentArea>
          </TicketAndCommentsWrapper>
        </TicketDetailPageWrapper>
      )}
    </>
  );
};

export default TicketDetailPage;
