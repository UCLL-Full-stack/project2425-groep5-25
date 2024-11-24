import { processEnv } from "env/env";

const getAllUsersIdName = async () => {
  return await fetch(processEnv.getApiUrl() + `/users/id-name`, {
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
