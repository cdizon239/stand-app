import React, { useEffect, useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SpaceSettings = ({ spaceId, ...props }) => {
  const params = useParams();
  return (
    <div style={{ margin: "20px 50px" }}>
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
