import React from "react";
import { Form, FormGroup, Card } from "react-bootstrap";
import { FormButton } from "./styles";
import SpaceSettings from "./SpaceSettings";
import Select from "react-select";
import { useParams } from "react-router-dom";

const SpaceSettingGeneral = () => {
  const params = useParams();

  const handleFormChange = () => {};

  const handleFormSubmit = () => {};

  const handleDelete = () => {};

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
            // defaultValue={}
            onChange={(e) => handleFormChange(e.target.name, e.target.value)}
          />
        </Form.Group>
        {/* <FormGroup className="mb-3">
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
      </Form>
      <FormButton onClick={handleFormSubmit}>Save name</FormButton>

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
          <FormButton onClick={handleDelete}>Delete space</FormButton>
        </div>
      </Card>
    </SpaceSettings>
  );
};

export default SpaceSettingGeneral;
