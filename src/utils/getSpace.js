export const getSpace = async (spaceId, setSpace) => {
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
      console.log(jsonSpace.data.members[0].user);
      setSpace(jsonSpace.data);
    }
  };