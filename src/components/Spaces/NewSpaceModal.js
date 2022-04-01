import React, { useState } from "react";
import { Modal, Form, FormGroup, Image } from "react-bootstrap";
import { getSpaces } from "../../utils/getSpaces";
import Select from "react-select";
import styled from "styled-components";

const Avatar = styled(Image)`
  height: 25px;
  margin-right: 10px;
`;

export const NewSpaceModal = ({
  showNewSpaceForm,
  setShowNewSpaceForm,
  usersInfo,
  setSpaces,
}) => {
  const [spaceInfo, setSpaceInfo] = useState({
    name: "",
    privacy: "",
    members: [],
  });

  const handleClose = () => setShowNewSpaceForm(false);

  const handleFormChange = (name, value) => {
    setSpaceInfo({
      ...spaceInfo,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(spaceInfo);
    const { name, privacy, members } = spaceInfo;
    let createSpace = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/spaces/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name,
          privacy: privacy,
          members: members,
        }),
      }
    );
    let createdSpace = await createSpace.json();
    getSpaces(setSpaces);
    setShowNewSpaceForm(false);
  };

  const privacyOptions = [
    { value: "private", label: "Private" },
    { value: "public", label: "Public" },
  ];

  const usersDropdown = usersInfo.map((user) => {
    return {
      value: user.email,
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
      <Modal show={showNewSpaceForm} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3> Create a new space</h3>
          <p>
            Space members have the ability to create, edit, and delete tickets
            to the space board. Space members could also add new members into
            the space
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Space Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter new space name"
                name="name"
                onChange={(e) =>
                  handleFormChange(e.target.name, e.target.value)
                }
              />
            </Form.Group>
            {/* <FormGroup className="mb-3" >
              <Form.Label>Space Privacy</Form.Label>
              <Select
                options={privacyOptions}
                name="privacy"
                onChange={(target, action) => {
                  handleFormChange(action.name, target.value);
                }}
                placeholder="Please select a space privacy setting"
              />
            </FormGroup> */}
            <FormGroup className="mb-3" >
              <Form.Label>Space Members</Form.Label>
              <Select
                options={usersDropdown}
                isMulti
                defaultValue={usersDropdown.find(
                  (user) =>
                    user.value === localStorage.getItem("loggedInUserEmail")
                )}
                name="members"
                onChange={(target, action) => {
                  let memberEmails = target.map((item) => item.value);
                  handleFormChange(action.name, memberEmails);
                }}
              />
            </FormGroup>
          </Form>
          <div style={{width: "100%", display: "flex"}} >
            <StyledButton onClick={handleFormSubmit}>Create Space</StyledButton>
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
