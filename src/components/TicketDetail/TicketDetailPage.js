import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import { Form, FormGroup, Image } from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";
import { TicketAndCommentsWrapper, TicketDetailPageWrapper } from "./styles";

const Avatar = styled(Image)`
  height: 25px;
`;

const TicketDetailPage = () => {
  const params = useParams();
  const [ticket, setTicket] = useState();
  const [spaceMembers, setSpaceMembers] = useState();

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
        let fetchedTicket = jsonTicket.data
      setTicket(fetchedTicket);
      let spaceMembers = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/spaces/" + fetchedTicket.space.id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      let jsonSpaceMembers = await spaceMembers.json();
  
      if (jsonSpaceMembers) {
        console.log(jsonSpaceMembers.data.members);
        setSpaceMembers(jsonSpaceMembers.data.members);
      }
    }
  };

  //    grab ticket on mount
  useEffect(() => {
    getTicket();
  }, []);


  //   form change handlers
  const handleFormChange = (name, value) => {
    setTicket({
      ...ticket,
      [name]: value,
    });
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
            <div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Ticket</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Write the ticket"
                    name="title"
                    defaultValue={ticket.title}
                    onChange={(e) =>
                      handleFormChange(e.target.name, e.target.value)
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
                      handleFormChange(e.target.name, e.target.value)
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
                      handleFormChange(action.name, target.value);
                    }}
                  />
                </FormGroup>
                {
                    spaceMembers && <FormGroup>
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
                        handleFormChange(action.name, target.value);
                      }}
                    />
                  </FormGroup>
                }
              </Form>
            </div>
            <div> Comment area</div>
          </TicketAndCommentsWrapper>
        </TicketDetailPageWrapper>
      )}
    </>
  );
};

export default TicketDetailPage;
