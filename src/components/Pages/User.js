import React, { useContext } from 'react';
import { ContextApi } from '../Router/BaseRouter';

const User = () => {
    const value = useContext(ContextApi);
    const {setIsAuthenticated} = value;  
    const signOut = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("isAuthenticated")
    }
    return (

        <>
            <h1>Welcome User</h1>
            <button onClick={signOut}>signOut</button>
        </>
    );
}

export default User;
