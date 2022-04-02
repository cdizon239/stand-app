import React, { useEffect, useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { useParams, useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import styled from "styled-components";

const SpaceSettings = ({ spaceId, ...props }) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ margin: "20px 50px" }}>
      <BackNavHeader onClick={() => navigate(-1, { replace: true })}>
        <ArrowLeft className="fs-2" />
        <h5 style={{ margin: "0 15px" }}>Back</h5>
      </BackNavHeader>
      <Row>
        <Col sm={3}>
          <NavLink to={`/space/${spaceId}/settings`}>
            <p>Space settings</p>
          </NavLink>
          <NavLink to={`/space/${spaceId}/edit_members`}>
            <p>Members</p>
          </NavLink>
        </Col>
        <Col sm={9}>{props.children}</Col>
      </Row>
    </div>
  );
};

export default SpaceSettings;

const BackNavHeader = styled.div`
  width: 80vw;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
