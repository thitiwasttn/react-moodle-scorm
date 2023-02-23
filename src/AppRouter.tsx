import React from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import App from "./App";
import {Home} from "./Home";
import {Login} from "./Login/Login";
import {Quiz} from "./Quiz";
import {CourseCreate} from "./CourseCreate";
const homepage = process.env.PUBLIC_URL;
export function AppRouter() {
    return (
        <>
            <Routes>
                <Route path={`${homepage}/`} element={<Home/>}/>
                <Route path={`${homepage}/login`} element={<Login/>}/>
                <Route path={`${homepage}/quiz`} element={<Quiz/>}/>
                <Route path={`${homepage}/course/create`} element={<CourseCreate/>}/>
            </Routes>
        </>
    )
}