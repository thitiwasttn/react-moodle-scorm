import React from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import App from "./App";
import {Home} from "./Home";
const homepage = process.env.PUBLIC_URL;
export function AppRouter() {
    return (
        <>
            <Routes>
                <Route path={`${homepage}/`} element={<Home/>}/>
            </Routes>
        </>
    )
}