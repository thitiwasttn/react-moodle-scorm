import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./Reducers/login_reducer";
import {bindActionCreators} from "redux";
import {actionCreators} from './Reducers/login_reducer/export'

export function MyNavBar() {
    const state = useSelector((state: RootState) => state.loginReducer);
    const {setUser} = bindActionCreators(actionCreators, useDispatch())


    function logout() {
        setUser(undefined)
        window.location.href = `${process.env.PUBLIC_URL}/login`
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">DEMO </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <span className={"me-1"}>{state.user?.user.id}</span> <span><strong>username</strong> {state.user?.username}</span>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link active" aria-current="page" href="#">Home</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="#">Features</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="#">Pricing</a>*/}
                        {/*</li>*/}
                    </ul>
                    <span className="navbar-text">
                        <button className={"btn"} onClick={function () {
                            logout()
                        }}>
                            Logout
                        </button>
                    </span>
                </div>
            </div>
        </nav>
    )
}