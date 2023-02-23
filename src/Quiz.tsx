import React, {useEffect} from 'react'
import {useParams, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./Reducers/login_reducer";

export function Quiz() {
    const [searchParams, setSearchParams] = useSearchParams();
    const state = useSelector((state: RootState) => state.loginReducer);

    function showQuiz() {
        let mapForm = document.createElement("form");
        mapForm.target = "myIframe";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = `${process.env.REACT_APP_API_ENDPOINT}/login/index.php`;

        let mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = "username";
        mapInput.value = `${state.user?.username}`;
        mapForm.appendChild(mapInput);

        let mapInput2 = document.createElement("input");
        mapInput2.type = "hidden";
        mapInput2.name = "password";
        mapInput2.value = `${state.user?.password}`;
        mapForm.appendChild(mapInput2);

        let mapInput3 = document.createElement("input");
        mapInput3.type = "hidden";
        mapInput3.name = "redir";
        // mapInput3.value = "/course/modedit.php?sr=0&add=scorm&section=0&course=5&display=popup";
        mapInput3.value = `/mod/scorm/player.php?a=${searchParams.get('a')}&scoid=${searchParams.get('scoid')}&mode=normal&display=popup;`;
        mapForm.appendChild(mapInput3);

        document.body.appendChild(mapForm);

        let map = window.open("", "myIframe", "height=600,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");

        if (map) {
            mapForm.submit();
        } else {
            alert('You must allow popups for this map to work.');
        }
    }

    useEffect(() => {
        showQuiz()
    }, [])
    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <iframe src="" name="myIframe" style={{
                            width: '100%',
                            height: '720px'
                        }}></iframe>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 text-end"}>
                        <button className={"btn btn-primary"} onClick={function () {
                            window.close();
                        }}>
                            ปิด
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}