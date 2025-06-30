import React, { useContext } from 'react';
import { ContextApi } from '../Router/BaseRouter';

const Admin = () => {
    const value = useContext(ContextApi)
    const { setIsAuthenticated, visibleData } = value;
    const signOut = () => {
        setIsAuthenticated(false)
        sessionStorage.removeItem("isAuthenticated")
    }
    return (
        <>
            <div style={{ display: 'flex' }}>
                <h1>Welcome Admin</h1>
                <button onClick={signOut}>SignOut</button>
            </div>
            <div>
                {visibleData.visible ? visibleData.data.length === 0 ? (<h1>Loading...</h1>) : (<>
                    <h1>Data</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleData.data.map((val, ind) => {
                                let { name, email, role } = val;
                                return (
                                    <tr key={ind}>
                                        <td>{ind + 1}</td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{role}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>) : null}
            </div>
        </>
    );
}

export default Admin;
