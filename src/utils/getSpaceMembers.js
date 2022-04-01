export const getSpaceMembers = async (spaceId) => {
  let allSpaceMembers = await fetch(
    process.env.REACT_APP_BACKEND_URL +
      "/api/v1/spaces/" +
      spaceId +
      "/space_members",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  let jsonSpaceMembers = await allSpaceMembers.json();

  return jsonSpaceMembers;
};
