
export const getSpaces = async (setSpaces) => {
    let allSpaces = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/spaces/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let jsonAllSpaces = await allSpaces.json();
    
    return jsonAllSpaces.data
  };