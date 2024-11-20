import HTTPService from "@network/HTTPService";

/**
 * 设置token
 * @param token
 */
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  const auth = getAuthorization(token);
  HTTPService.appendHeader("Authorization", auth);
};

export const getAuthorization = (token?: string) => {
  const _token = token || localStorage.getItem("token");
  return `Bearer ${_token}`;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const setUserInfo = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserInfo = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logOut = () => {
  localStorage.removeItem("token");
};
