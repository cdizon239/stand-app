import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./Spaces.css";
import { NavLink } from "react-router-dom";

export const SpacesList = ({ spaces }) => {
  return (
    <>
      <Row xs={1} md={3} lg={4} className="g-4">
        {spaces.map((space) => {
          return (
            <Col key={space.id}>
              <NavLink
                className="nav-link"
                to={`/space/${space.id}`}
                key={`space_${space.id}`}
              >
                <Card className="card-container">
                  <Card.Img
                    variant="top"
                    src={`/images/${Math.floor(Math.random() * 8) + 1}.png`}
                    className="card-image"
                    bsPrefix="img"
                  />
                  <Card.Body className="card-body">
                    <div className="card-details">
                      <h6>#{space.name}</h6>
                    </div>
                    <Button variant="secondary" className="card-button">Enter</Button>
                  </Card.Body>
                </Card>
              </NavLink>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
