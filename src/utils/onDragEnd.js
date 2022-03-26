import React from 'react'
import { editTicketStatus } from './editTicketStatus';

const onDragEnd = (result, columns, setColumns) => {
    //  is dropping to same column, do nothing
    console.log(result);
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

      editTicketStatus(result.draggableId, result.destination.droppableId)

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

export default onDragEnd