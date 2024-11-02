const getAllUsersIdName = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/id-name`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const UserService = {
  getAllUsersIdName,
};

export default UserService;
