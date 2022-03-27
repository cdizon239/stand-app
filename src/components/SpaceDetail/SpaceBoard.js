import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import onDragEnd from "../../utils/onDragEnd";
import { PlusCircleFill, ThreeDots } from "react-bootstrap-icons";
import { ColumnWrapper, DraggableTicket } from "./styles";
import TicketDropdown from "./Tickets/TicketDropdown";
import { deleteTicket } from "../../utils/deleteTicket";

const SpaceBoard = ({ tickets, setShowNewTicketForm, fetchTickets }) => {
  const [columns, setColumns] = useState({});

  //  put tickets on their categories / status on mount
  useEffect(() => {
    console.log(tickets);
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
  }, [tickets]);

  useEffect(() => {
    console.log(columns);
  }, [columns])


  return (
    <>
      {tickets.length > 0 && (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <DragDropContext
            onDragEnd={(result) => {
              onDragEnd(result, columns, setColumns);
            }}
          >
            {/*  each droppable has a key that SHOULD BE unique */}
            {Object.entries(columns).map(([id, column]) => {
              return (
                <ColumnWrapper key={id}>
                  <h5>{id}</h5>
                  <PlusCircleFill onClick={() => setShowNewTicketForm(true)} />
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
                                      <TicketDropdown ticketId={item.id} fetchTickets={fetchTickets} />
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
