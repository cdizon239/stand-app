import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getTickets } from "../../utils/getTickets";
import { useParams } from "react-router-dom";
import onDragEnd from "../../utils/onDragEnd";

const SpaceBoard = ({space, tickets}) => {
  // const [tickets, setTickets] = useState([])
  const [columns, setColumns] = useState({});

  useEffect( async () => {
    // await getTickets(setTickets, space.id)
    setColumns({
      ...columns,
      "To do": {
        items: tickets?.filter(ticket => ticket.status === "To do")
      },
      "In Progress": {
        items: tickets?.filter(ticket => ticket.status === "In Progress")
      },
      "Blocked": {
        items: tickets?.filter(ticket => ticket.status === "Blocked")
      },
      "Done": {
        items: tickets?.filter(ticket => ticket.status === "Done")
      },
    })
  }, [])

  useEffect(() => {
    console.log(space);
  }, [space])

  useEffect(() => {
    console.log(tickets);
  }, [tickets])

  return (
    <>
      <div>SpaceBoard</div>
    {tickets && 
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {/*  each droppable has a key that SHOULD BE unique */}
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "0 5px",
                }}
                key={id}
              >
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
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#26384a"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.title}
                                  </div>
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
              </div>
            );
          })}
        </DragDropContext>
      </div>
}
    </>
  );
};

export default SpaceBoard;
