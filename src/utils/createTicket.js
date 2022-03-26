export const createTicket = async (spaceId, ticketInfo, getTickets, setTickets) => {
    
    let newTicket = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/tickets/"+spaceId+'/add_ticket',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
              title: ticketInfo.title || '',
              description: ticketInfo.description || '',
              status: ticketInfo.status || '',
              assignee: ticketInfo.assignee || null
          })
        }
      );
    let createdTicket = newTicket.json()
    if (createdTicket) {
        getTickets(setTickets, spaceId)
    }
}
