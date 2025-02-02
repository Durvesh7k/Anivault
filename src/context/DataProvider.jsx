import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [params, setParams] = useState('');

    return (
        <DataContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            params,
            setParams,
        }}>
            {children}
        </DataContext.Provider>
    )
}

DataProvider.propTypes = {
    children : PropTypes.node.isRequired
}

export default DataProvider;