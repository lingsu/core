import { getToken, getTokenHeader, removeUser, setUser } from "../utils";

export default () => {
  return {
    tokenHeader: getTokenHeader(),
    token: getToken(),
    remove: removeUser,
    add: setUser
  };
};
