import {createContext, useState, useEffect} from 'react';

export const BaseUrlStore = createContext();

const BaseUrlContext = (props) => {
    const [data, setData] = useState({
        //baseUrl: `http://localhost:8080`
        baseUrl: `host.docker.internal:8080`
});

    const BaseUrl = {
        data,
        setData,
    }

    return(<BaseUrlStore.Provider value={BaseUrl}>{props.children}</BaseUrlStore.Provider>)
}

export default BaseUrlContext;