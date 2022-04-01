export const getArchivedTickets =  async (spaceId) => {
    let archivedTickets = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/tickets/" + spaceId+ '/all_tickets'
        ,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      let jsonarchivedTickets = await archivedTickets.json();
  
      // if(jsonarchivedTickets) {
      //   console.log(jsonarchivedTickets);
      //   setTickets(jsonarchivedTickets.data)
      // }

      console.log(jsonarchivedTickets.data);
      return jsonarchivedTickets.data.filter(ticket => ticket.is_archived === true)
}
