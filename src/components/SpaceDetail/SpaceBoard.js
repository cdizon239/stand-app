import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getTickets } from "../../utils/getTickets";
import { useParams } from "react-router-dom";
import onDragEnd from "../../utils/onDragEnd";
import styled from "styled-components";


const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
`;

const DraggableTicket = styled.div`
  user-select: none;
  padding: 16;
  margin: 0 0 8px 0;
  min-height: 50px;
  color: white;
`;

const SpaceBoard = ({ space, tickets }) => {
  const [columns, setColumns] = useState({});

  //  put tickets on their categories / status on mount
  useEffect(async () => {
    setColumns({
      ...columns,
      "To do": {
        items: tickets?.filter((ticket) => ticket.status === "To do"),
      },
      "In Progress": {
        items: tickets?.filter((ticket) => ticket.status === "In Progress"),
      },
      Blocked: {
        items: tickets?.filter((ticket) => ticket.status === "Blocked"),
      },
      Done: {
        items: tickets?.filter((ticket) => ticket.status === "Done"),
      },
    });
  }, []);


  return (
    <>
      {tickets && (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <DragDropContext
            onDragEnd={(result) => {
              onDragEnd(result, columns, setColumns)
            }}
          >
            {/*  each droppable has a key that SHOULD BE unique */}
            {Object.entries(columns).map(([id, column]) => {
              return (
                <ColumnWrapper key={id}>
                  <h2>{id}</h2>
                  <Droppable droppableId={id} key={id}>
                    {/*  provided are styles, props, etc */}
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightBlue"
                              : "lightGray",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={`${item.id}`}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <DraggableTicket
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? "#26384a"
                                          : "#456C86",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.title}
                                    </DraggableTicket>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </ColumnWrapper>
              );
            })}
          </DragDropContext>
        </div>
      )}
    </>
  );
};

export default SpaceBoard;
