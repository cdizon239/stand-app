export const editTicketStatus = async (ticketId, ticketStatus) => {
    let editTicket = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/tickets/" + ticketId+"/edit",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
              status: ticketStatus
          })
        }
      );
      // let editedTicket = await editTicket.json();
  
      // return editedTicket.data
}
