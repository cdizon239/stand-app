export const getSpace = async (spaceId) => {
    let spaceToFetch = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/spaces/" + spaceId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let jsonSpace = await spaceToFetch.json();


    if (jsonSpace) {
      return jsonSpace.data
    }
  };