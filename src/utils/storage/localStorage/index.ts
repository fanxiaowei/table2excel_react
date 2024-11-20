
export enum LS_KEYS {
  USER = "user",
  SESSION = "session",
  IS_FIRST_LOGIN = "isFirstLogin",
}

export const setData = (key: LS_KEYS, value: object) => {
  if (typeof localStorage === "undefined") {
    return null;
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeData = (key: LS_KEYS) => {
  if (typeof localStorage === "undefined") {
    return null;
  }
  localStorage.removeItem(key);
};

export const getData = (key: LS_KEYS) => {
  try {
    if (
      typeof localStorage === "undefined" ||
      typeof key === "undefined" ||
      typeof localStorage.getItem(key) === "undefined" ||
      localStorage.getItem(key) === "undefined"
    ) {
      return null;
    }
    const data = localStorage.getItem(key);
    return data && JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
};

export const clearData = () => {
  if (typeof localStorage === "undefined") {
    return null;
  }
  localStorage.clear();
};
