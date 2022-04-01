export const getRooms = async () => {
  let allRooms = await fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/v1/video/get_active_rooms",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  let jsonAllRooms = await allRooms.json();

  return jsonAllRooms.data;
};
