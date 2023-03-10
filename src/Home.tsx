import React, {useEffect, useState} from 'react'
import {MyNavBar} from "./MyNavBar";
import {Course, ResponseCourse} from "./Model/ResponseCourse";
import {useSelector} from "react-redux";
import {RootState} from "./Reducers/login_reducer";
import axios from "axios";
import qs from "qs";
import {ResponseScorm} from "./Model/ResponseScorm";
import {ResponseScore} from "./Model/ResponseScore";
import {useNavigate} from "react-router-dom";

interface TempScore {
    scormId: number,
    scorm: ResponseScore
}

export function Home() {
    const state = useSelector((state: RootState) => state.loginReducer);
    const [course, setCourse] = useState<Course[]>([])
    const [score, setScore] = useState<TempScore[]>([])
    const navigateFunction = useNavigate();
    useEffect(() => {
    }, [score])

    async function loadData() {
        const query = qs.stringify({
            wstoken: `${process.env.REACT_APP_ADMIN_TOKEN_MOODLE_MOBILE_APP}`,
            wsfunction: "core_course_get_courses_by_field",
            moodlewsrestformat: 'json',
            field: 'category',
            value: 2
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        await axios.post<ResponseCourse>(`${process.env.REACT_APP_API_ENDPOINT}/webservice/rest/server.php?${query}`).then(async value1 => {
            let courses = (value1.data.courses as Course[]).reverse();
            // setCourse(courses)

            for (let course of courses) {
                const query2 = qs.stringify({
                    wstoken: `${process.env.REACT_APP_ADMIN_TOKEN_MOODLE_MOBILE_APP}`,
                    wsfunction: "mod_scorm_get_scorms_by_courses",
                    moodlewsrestformat: 'json',
                    'courseids[0]': course.id
                }, {
                    encodeValuesOnly: true, // prettify URL
                });
                await axios.post<ResponseScorm>(`${process.env.REACT_APP_API_ENDPOINT}/webservice/rest/server.php?${query2}`).then(scorm => {
                    const scorms = scorm.data.scorms;
                    course.scorms = scorms;
                })
            }

            let tempScores: TempScore[] = [];
            for (let cours of courses) {

                for (let scorm of cours.scorms) {
                    const query2 = qs.stringify({
                        wstoken: `${process.env.REACT_APP_ADMIN_TOKEN_MOODLE_MOBILE_APP}`,
                        wsfunction: "mod_scorm_get_scorm_sco_tracks",
                        moodlewsrestformat: 'json',
                        'scoid': scorm.launch,
                        'userid': state.user?.user.id
                    }, {
                        encodeValuesOnly: true, // prettify URL
                    });
                    let resScore: ResponseScore = await axios.post<ResponseScore>(`${process.env.REACT_APP_API_ENDPOINT}/webservice/rest/server.php?${query2}`).then(value => {
                        const data = value.data;
                        return data;
                    })
                    tempScores.push({
                        scorm: resScore,
                        scormId: scorm.launch
                    })
                }
            }

            setScore(tempScores);
            setCourse(courses)
        })
    }

    useEffect(() => {
        if (state.user?.user) {
            loadData()
        }
    }, [])

    function getScore(id: number) {
        let ret: number = 9999;
        // console.log('idid', id);
        // console.log('scorescore', score);
        const find = score.find(value => value.scormId === id);
        let value1 = find?.scorm.data.tracks.find(value => value.element === 'score_raw')
        return value1?.value;
    }

    function openAddScorm(courseId: number) {
        let mapForm = document.createElement("form");
        mapForm.target = "Map";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = `${process.env.REACT_APP_API_ENDPOINT}/login/index.php`;

        let mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = "username";
        mapInput.value = "admin";
        mapForm.appendChild(mapInput);

        let mapInput2 = document.createElement("input");
        mapInput2.type = "hidden";
        mapInput2.name = "password";
        mapInput2.value = "P@ssw0rd";
        mapForm.appendChild(mapInput2);

        let mapInput3 = document.createElement("input");
        mapInput3.type = "hidden";
        mapInput3.name = "redir";
        mapInput3.value = `/course/modedit.php?sr=0&add=scorm&section=0&course=${courseId}&display=popup`;
        mapForm.appendChild(mapInput3);

        document.body.appendChild(mapForm);

        let map = window.open("", "Map", "height=600,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");

        if (map) {
            mapForm.submit();
        } else {
            alert('You must allow popups for this map to work.');
        }
    }

    function returnListCourse() {
        let ret = course.map(value => {
            return (
                <div key={value.id} className={"col mt-3"}>
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title"><strong>Full name</strong> {value.fullname}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                <strong>Short name</strong> {value.shortname}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                                <strong>id</strong> {value.id}
                            </h6>
                            <button className={"btn btn-secondary mb-2"} onClick={function () {
                                openAddScorm(value.id)
                            }}>
                                Add Quiz
                            </button>
                            <div className="card-text" hidden={value.scorms.length === 0}>

                                <ul className="list-group">
                                    {
                                        value.scorms.map(value1 => {
                                            const score1 = getScore(value1.launch);
                                            // console.log('score1score1', score1);
                                            return (
                                                <li key={value1.id} className="list-group-item" style={{
                                                    cursor: 'pointer'
                                                }} onClick={function () {

                                                    const query2 = qs.stringify({
                                                        wstoken: `${process.env.REACT_APP_ADMIN_TOKEN_GVENT}`,
                                                        wsfunction: "enrol_manual_enrol_users",
                                                        moodlewsrestformat: 'json',
                                                        'enrolments[0][roleid]': 5,
                                                        'enrolments[0][userid]': state.user?.user.id,
                                                        'enrolments[0][courseid]': value.id
                                                    }, {
                                                        encodeValuesOnly: true, // prettify URL
                                                    });
                                                    axios.post<ResponseScore>(`${process.env.REACT_APP_API_ENDPOINT}/webservice/rest/server.php?${query2}`).then(value => {
                                                        window.open(
                                                            `${process.env.PUBLIC_URL}/quiz?a=${value1.id}&scoid=${value1.launch}`,
                                                            '_blank' // <- This is what makes it open in a new window.
                                                        );
                                                    })

                                                }}>
                                                    <div className={"row"}>
                                                        <div className={"col-12"}>
                                                            {value1.name}
                                                        </div>
                                                        <div className={"col-12"}
                                                             hidden={score1 === '' || score1 === undefined}>
                                                            Score: {score1}
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {/*<a href="#" className="card-link">Card link</a>*/}
                            {/*<a href="#" className="card-link">Another link</a>*/}
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className={"row"}>
                {ret}
            </div>
        );
    }

    return (
        <>
            <MyNavBar/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 mt-3"}>
                        <button className={'btn btn-info'} onClick={function () {
                            navigateFunction(`${process.env.PUBLIC_URL}/course/create`)
                        }}>
                            Create Course
                        </button>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 mt-3"}>
                        {
                            returnListCourse()
                        }
                    </div>
                </div>
            </div>
        </>
    )
}