import React, { useEffect, useState } from "react";
import { Form, FormGroup, Card } from "react-bootstrap";
import { FormButton } from "./styles";
import SpaceSettings from "./SpaceSettings";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { getSpace } from "../../utils/getSpace";

const SpaceSettingGeneral = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [spaceName, setSpaceName] = useState();

  const handleFormChange = (e) => {
    e.preventDefault()
    console.log(e.target.value);
    setSpaceName(e.target.value)
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let editSpaceName = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/v1/spaces/" +
        params.space_id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: spaceName
        }),
      }
    );
  };

  useEffect(() => {
    let fetchSpace = async () => {
      let spaceFetched = await getSpace(params.space_id);
      if (spaceFetched) {
        setSpaceName(spaceFetched.name);
      }
    };
    fetchSpace(); 
  }, [])

  const handleDeleteSpace = async (e) => {
    e.preventDefault();
    let deleteSpace= await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/v1/spaces/" +
        params.space_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    navigate('/all_spaces')
  };

  const privacyOptions = [
    { value: "private", label: "Private" },
    { value: "public", label: "Public" },
  ];
  return (
    <SpaceSettings spaceId={params.space_id}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Space Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please enter new space name"
            name="name"
            defaultValue={spaceName}
            onChange={handleFormChange}
          />
        </Form.Group>
      </Form>
      <FormButton onClick={handleFormSubmit}>Update name</FormButton>

      <Card style={{ width: "100%", padding: "20px", borderColor: "#F05441" }} className="mb-2">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>Danger zone</h5>
          Delete the space. This space will be gone forever, the board and
          tickets would also go away.
          <FormButton onClick={handleDeleteSpace}>Delete space</FormButton>
        </div>
      </Card>
    </SpaceSettings>
  );
};

export default SpaceSettingGeneral;
