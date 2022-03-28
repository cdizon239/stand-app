export const getTickets =  async (spaceId, setTickets) => {
    let allTickets = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/tickets/" + spaceId+ '/all_tickets'
        ,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      let jsonAllTickets = await allTickets.json();
  
      if(jsonAllTickets) {
        console.log(jsonAllTickets);
        setTickets(jsonAllTickets.data)
      }
  
      return jsonAllTickets.data
}
