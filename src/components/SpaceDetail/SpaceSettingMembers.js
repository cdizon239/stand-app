import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../../utils/getUsers";
import { getSpaceMembers } from "../../utils/getSpaceMembers";
import { Avatar, FormButton } from "./styles";
import SpaceSettings from "./SpaceSettings";
import { Form, FormGroup, ListGroup, Button } from "react-bootstrap";
import Select from "react-select";
import "./SpaceDetailPage.css";

const SpaceSettingMembers = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState();
  const [spaceMembers, setSpaceMembers] = useState();
  const [membersToAdd, setMembersToAdd] = useState();

  let fetchSpaceMembers = async () => {
    let membersFetched = await getSpaceMembers(params.space_id);
    if (membersFetched) {
      setSpaceMembers(membersFetched.data);
    }
  };

  const handleFormChange = (listOfEmails) => {
    setMembersToAdd(listOfEmails);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let addMembers = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/v1/spaces/" +
        params.space_id +
        "/add_members",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          members: membersToAdd,
        }),
      }
    );

    let membersAddJson = await addMembers.json();

    if (membersAddJson) {
      fetchSpaceMembers()
    }
  };

  const handleRemoveMember = async (e, userId) => {
    e.preventDefault();
    let deleteMembers = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/v1/spaces/" +
        params.space_id +
        "/remove_member/" +
        userId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    let deleteMembersResponse = await deleteMembers.json();

    if (deleteMembersResponse) {
      fetchSpaceMembers()
    }
  };

  const usersDropdown = allUsers?.map((user) => {
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

  useEffect(() => {
    let fetchUsers = async () => {
      let usersFetched = await getUsers();
      if (usersFetched) {
        setAllUsers(usersFetched);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchSpaceMembers();
  }, []);

  return (
    <>
      <SpaceSettings spaceId={params.space_id}>
        <Form>
          <FormGroup className="mb-3">
            <Form.Label>Members to add</Form.Label>
            <Select
              options={usersDropdown}
              isMulti
              name="members"
              onChange={(target, action) => {
                let memberEmails = target.map((item) => item.value);
                handleFormChange(memberEmails);
              }}
            />
          </FormGroup>
          <FormButton onClick={handleFormSubmit}>Save</FormButton>
        </Form>
        <div>
          <h6>Current Space Members</h6>
          <ListGroup>
            {spaceMembers?.map((member) => {
              return (
                <div className="list-item" key={member.id}>
                  <div style={{ display: "flex" }}>
                    <Avatar
                      src={member.img_url}
                      referrerPolicy="no-referrer"
                      roundedCircle
                    />
                    <p className="member-name">{member.name}</p>
                  </div>
                  <Button className='card-button' variant="secondary" onClick={(e) => handleRemoveMember(e, member.id)}>
                    Remove
                  </Button>
                </div>
              );
            })}
          </ListGroup>
        </div>
      </SpaceSettings>
    </>
  );
};

export default SpaceSettingMembers;
