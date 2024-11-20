type ResponseJson<T> = {
  code: number;
  data: T;
  msg?: string;
};

type User = {
  id: string;
  uid: string;
  username: string;
};
