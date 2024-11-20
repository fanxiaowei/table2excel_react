import { LS_KEYS, getData, setData } from ".";

export const getToken = (): string => {
    const token = getData(LS_KEYS.USER)?.token;
    return token;
};

export const getUserID = () => getData(LS_KEYS.USER)?.id;

export const isFirstLogin = () =>
    getData(LS_KEYS.IS_FIRST_LOGIN)?.status ?? false;

export function setIsFirstLogin(status: boolean) {
    setData(LS_KEYS.IS_FIRST_LOGIN, { status });
}

