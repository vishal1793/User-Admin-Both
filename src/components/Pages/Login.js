import { React, useState, useEffect, useContext } from 'react';
import { authAxios } from '../Auth/Auth';
import { jwtDecode } from 'jwt-decode'
import './CSS/login.css'
import { ContextApi } from '../Router/BaseRouter';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const value = useContext(ContextApi)
    const { visibleData, setVisibleData, isAuthenticated, setIsAuthenticated, setUserType } = value
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [ref, setRef] = useState(true)
    const navigate = useNavigate()

    const getData = async (Token) => {
        await authAxios.get('/data', {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }).then((res) => {
            console.log(res.data)
            setIsAuthenticated(true);
            sessionStorage.setItem("isAuthenticated", true);
            if(res.data.visibleData){
                setUserType('Admin');
                sessionStorage.setItem('userType', 'Admin');
                setVisibleData({ ...visibleData, visible: true, data: res.data.visibleData });
                navigate('/admin')
            }else{
                setUserType('User');
                sessionStorage.setItem('userType', 'User');
                navigate('/user')
            }
        }).catch((err) => {
            console.log("error", err)
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(data);
        await authAxios.post('/logindata', data).then((res) => {
            console.log(res.data);
            if(res.data.token){
                getData(res.data.token);
            }else{
                alert(res.data)
            }
    }).catch ((err) => {
        console.log(err);
    })
}


return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="mail" placeholder="email" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
            <br />
            <input type="password" placeholder="password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
            <br />
            <button>Submit</button>
        </form>
    </>
);
}

export default Login;
