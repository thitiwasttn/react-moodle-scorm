import React, {useState} from 'react';
import {MyNavBar} from "./MyNavBar";
import axios from "axios";
import qs from "qs";
import {ResponseScorm} from "./Model/ResponseScorm";
import {useNavigate} from "react-router-dom";

export function CourseCreate() {
    const [form, setForm] = useState<{
        "fullName": string
        "shortName": string
    }>({
        fullName: "", shortName: ""
    })
    const navigateFunction = useNavigate();

    async function save() {
        const query2 = qs.stringify({
            wstoken: `${process.env.REACT_APP_ADMIN_TOKEN_GVENT}`,
            wsfunction: "core_course_create_courses",
            moodlewsrestformat: 'json',
            'courses[0][fullname]': form.fullName,
            'courses[0][shortname]': form.shortName,
            'courses[0][categoryid]': 2
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        await axios.post<ResponseScorm>(`${process.env.REACT_APP_API_ENDPOINT}/webservice/rest/server.php?${query2}`).then(scorm => {
            navigateFunction(`${process.env.PUBLIC_URL}/`)
        })
    }

    return (
        <>
            <MyNavBar/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Fullname</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"
                               value={form.fullName}
                               onChange={function (event) {
                                   const value = event.currentTarget.value;
                                   setForm(prevState => {
                                       return {
                                           ...prevState,
                                           fullName: value
                                       }
                                   })
                               }}
                               aria-describedby="emailHelp"/>
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Short name</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"
                               value={form.shortName}
                               onChange={function (event) {
                                   const value = event.currentTarget.value;
                                   setForm(prevState => {
                                       return {
                                           ...prevState,
                                           shortName: value
                                       }
                                   })
                               }}
                        />
                    </div>
                    <div className={"col-12 text-center"}>
                        <button type="submit" className="btn btn-primary" onClick={function () {
                            save()
                        }}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}