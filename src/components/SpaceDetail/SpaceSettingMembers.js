import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../../utils/getUsers";
import { Avatar, FormButton } from "./styles";
import SpaceSettings from "./SpaceSettings";
import {Form, FormGroup} from 'react-bootstrap'
import Select from 'react-select'

const SpaceSettingMembers = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState();

  const handleClose = () => {
    navigate(`/space/${params.space_id}`);
  };

  const handleFormChange = () => {};

  const handleFormSubmit = () => {};

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
        setAllUsers(usersFetched.data);
      }
    };
    fetchUsers();
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
                handleFormChange(action.name, memberEmails);
              }}
            />
          </FormGroup>
        </Form>
      </SpaceSettings>
    </>
  );
};

export default SpaceSettingMembers;
