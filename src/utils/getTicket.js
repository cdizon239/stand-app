export const getTicket = async (ticketId, setTicket, setSpaceId, setSpaceMembers) => {
    let ticketToFetch = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/tickets/" + ticketId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let jsonTicket = await ticketToFetch.json();

    if (jsonTicket) {
      let fetchedTicket = jsonTicket.data;
      setTicket(fetchedTicket);
      setSpaceId(fetchedTicket.space.id);

      //    once you have a ticket, fetch space members
      let spaceMembers = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/api/v1/spaces/" +
          fetchedTicket.space.id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      let jsonSpaceMembers = await spaceMembers.json();

      if (jsonSpaceMembers) {
        console.log(jsonSpaceMembers.data.members);
        setSpaceMembers(jsonSpaceMembers.data.members);
      }
    }
  };