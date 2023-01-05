import { useState, createContext } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [globalContextData, setGlobalContextData] = useState({});

    return (
        <DataContext.Provider value={{
            globalContextData,
            setGlobalContextData
        }}>
            { children }
        </DataContext.Provider>
    );
}

export default DataProvider;