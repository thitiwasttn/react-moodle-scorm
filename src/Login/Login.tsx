import React, {useEffect, useState} from 'react'
import axios from "axios";
import qs from "qs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Reducers/login_reducer";
import {bindActionCreators} from "redux";
import {actionCreators} from '../Reducers/login_reducer/export'
import {UserM} from "../Model/UserM";
import {useNavigate} from "react-router-dom";

export function Login() {
    const state = useSelector((state: RootState) => state.loginReducer);
    const {setUser} = bindActionCreators(actionCreators, useDispatch())
    const [loginForm, setLoginForm] = useState<{
        username: string,
        password: string
    }>({
        password: "", username: ""
    })

const navigateFunction = useNavigate();
    useEffect(() => {
        if (state.user) {
            navigateFunction(`${process.env.PUBLIC_URL}/`)
        }
    }, [])

    function login() {
        let data = new FormData();
        data.append("username", loginForm.username)
        data.append("password", loginForm.password)
        data.append("service", 'moodle_mobile_app');
        axios.post<{
            "token": string,
            "privatetoken": any
        }>(`${process.env.REACT_APP_API_ENDPOINT}/login/token.php`, data).then(value => {
            const data1 = value.data;
            if (data1.token) {
                const query = qs.stringify({
                    wstoken: `${process.env.REACT_APP_ADMIN_TOKEN_MOODLE_MOBILE_APP}`,
                    wsfunction: 'core_user_get_users_by_field',
                    moodlewsrestformat: 'json',
                    field: 'username',
                    'values[0]': loginForm.username
                }, {
                    encodeValuesOnly: true, // prettify URL
                });
                axios.post<UserM[]>(`${process.env.REACT_APP_API_ENDPOINT}/webservice/rest/server.php?${query}`).then(value1 => {
                    const data2 = value1.data;
                    console.log(data2);
                    setUser({
                        "userId": `${data2[0].id}`,
                        "username": data2[0].username,
                        "user": data2[0]
                    })
                    navigateFunction(`${process.env.PUBLIC_URL}/`)
                })
            }
        })
    }

    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col mt-5"}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   value={loginForm.username}
                                   onChange={function (e) {
                                       const value = e.currentTarget.value;
                                       setLoginForm(prevState => {
                                           return {
                                               ...prevState,
                                               username: value
                                           }
                                       })
                                   }}
                                   aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   value={loginForm.password}
                                   onChange={function (event) {
                                       const value = event.currentTarget.value;
                                       setLoginForm(prevState => {
                                           return {
                                               ...prevState,
                                               password: value
                                           }
                                       })
                                   }}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={function () {
                            login()
                        }}>Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}