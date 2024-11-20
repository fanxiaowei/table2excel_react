import { createContext } from "react";

interface GlobalContextType {
    theme: string;
}
const defaultGlobalContextType: GlobalContextType = {
    theme: "light",
};
const GlobalContext = createContext<GlobalContextType>(
    defaultGlobalContextType,
);

export default GlobalContext;
