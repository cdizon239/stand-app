export const getComments =  async (ticketId, setComments) => {
    let allComments = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/comments/" + ticketId+ '/all_comments'
        ,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      let jsonAllComments = await allComments.json();
  
      if(jsonAllComments) {
        console.log(jsonAllComments);
        setComments(jsonAllComments.data)
      }
  
    //   return jsonAllComments.data
}
