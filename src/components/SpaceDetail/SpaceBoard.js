import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { getTickets } from "../../utils/getTickets";
import { useParams } from "react-router-dom";


const onDragEnd = (result, columns, setColumns) => {
  //  is dropping to same column, do nothing
  if (!result.destination) return;
  const { source, destination } = result;
  //  if we're changing to a differnet column
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index,1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    //  get our column/s
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];

    //  splice and remove item from array
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      // current column id
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const SpaceBoard = ({space}) => {
  const params = useParams()
  const [tickets, setTickets] = useState([])
  const [columns, setColumns] = useState({});

  useEffect( async () => {
    await getTickets(setTickets, space.id)
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
    console.log(tickets);
  }, [tickets])

  return (
    <>
      <div>SpaceBoard</div>
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
    </>
  );
};

export default SpaceBoard;
