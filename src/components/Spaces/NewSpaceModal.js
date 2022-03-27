import React, { useState } from "react";
import { Modal, Button, Form, FormGroup, Image } from "react-bootstrap";
import { createSpace } from "../../utils/createSpace";
import Select from "react-select";
import styled from "styled-components";

const Avatar = styled(Image)`
  height: 25px;
`;

export const NewSpaceModal = ({
  showNewSpaceForm,
  setShowNewSpaceForm,
  usersInfo,
  getSpaces,
  setSpaces
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
      [name]: value
    });
  };

  const handleFormSubmit = async () => {
    console.log(spaceInfo);
    createSpace(spaceInfo)
    getSpaces(setSpaces)
    setShowNewSpaceForm(false)
  }

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

  // useEffect(() => {
  //   console.log(spaceInfo);
  // }, [spaceInfo]);

  //    handle create space button: make a request to create a space
  return (
    <>
      <Modal show={showNewSpaceForm} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3> Create a new space</h3>
          You will be an owner of this new space... Lorem ipsum dolo i met
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Space Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter new space name"
                name="name"
                onChange={(e) => handleFormChange(e.target.name, e.target.value)}
              />
            </Form.Group>
            <FormGroup>
              <Form.Label>Space Privacy</Form.Label>
              <Select
                options={privacyOptions}
                name="privacy"
                onChange={(target, action) => {
                  handleFormChange(action.name, target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
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
                  let memberEmails = target.map(item => item.value)
                  handleFormChange(action.name, memberEmails);
                }}
              />
            </FormGroup>
          </Form>
          <Button variant="primary" onClick={handleFormSubmit}>
            Create Space
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
