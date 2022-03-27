export const deleteTicket = async (ticketId) => {
    let deleteTicket = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/tickets/"+ticketId+"/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
  };