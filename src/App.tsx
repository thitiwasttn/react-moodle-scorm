import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import qs from 'qs';
import {AppRouter} from "./AppRouter";

const token = 'a3f3a1ff1cd77bbbae1c6fe1e9a0d679';

function App() {
    return (
        <>
            <AppRouter/>
        </>
    )
    // useEffect(()=> {
    //     const query = qs.stringify({
    //         wstoken: "bf0f442304fe28ff1e7cd5b890a391ad",
    //         wsfunction: "core_course_get_courses_by_field",
    //         moodlewsrestformat: 'json',
    //         field: 'category',
    //         value: 2
    //     }, {
    //         encodeValuesOnly: true, // prettify URL
    //     });
    //     axios.post(`http://10.30.1.10/moodle/webservice/rest/server.php?${query}`).then(value1 => {
    //         console.log(value1.data);
    //     })
    // })
    // function getBase64(file: File) {
    //     return new Promise(resolve => {
    //         let fileInfo;
    //         let baseURL: string | ArrayBuffer | null = "";
    //         // Make new FileReader
    //         let reader = new FileReader();
    //
    //         // Convert the file to base64 text
    //         reader.readAsDataURL(file);
    //
    //         // on reader load somthing...
    //         reader.onload = () => {
    //             // Make a fileInfo Object
    //             console.log("Called", reader);
    //             baseURL = reader.result;
    //             //console.log(baseURL);
    //             resolve(baseURL);
    //         };
    //         //console.log(fileInfo);
    //     });
    // };
    // return (
    //     <>
    //         <div>
    //             <h2>upload</h2>
    //             <div>
    //                 <input type="file" onChange={function (event) {
    //                     const files = event.target.files;
    //                     if (files) {
    //                         const file = files[0];
    //                         console.log(file);
    //                         getBase64(file).then(value => {
    //                             const query = qs.stringify({
    //                                 wstoken: "eacb6ceebcdfbfce4656f0bd4bb475fd",
    //                                 wsfunction: "core_files_upload",
    //                                 moodlewsrestformat: "json",
    //                                 filecontent: value,
    //                                 component: 'scorm',
    //                                 filearea: 'private',
    //                                 itemid: 0,
    //                                 filepath: '/',
    //                                 filename: 'test api upload'
    //                             }, {
    //                                 encodeValuesOnly: true, // prettify URL
    //                             });
    //                             axios.post(`http://localhost/myMoodle/webservice/rest/server.php?${query}`).then(value1 => {
    //                                 console.log(value1);
    //                             })
    //                         })
    //                     }
    //
    //                 }}/>
    //             </div>
    //         </div>
    //         <hr/>
    //         <div>
    //             <button onClick={async function () {
    //                 // window.open("http://localhost/myMoodle/mod/scorm/player.php?a=6&scoid=19&display=popup&mode=browse", 'popUpWindow', 'height=300,width=400,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
    //                 let mapForm = document.createElement("form");
    //                 mapForm.target = "Map";
    //                 mapForm.method = "POST"; // or "post" if appropriate
    //                 mapForm.action = "http://10.30.1.10/moodle/login/index.php";
    //
    //                 let mapInput = document.createElement("input");
    //                 mapInput.type = "hidden";
    //                 mapInput.name = "username";
    //                 mapInput.value = "admin";
    //                 mapForm.appendChild(mapInput);
    //
    //                 let mapInput2 = document.createElement("input");
    //                 mapInput2.type = "hidden";
    //                 mapInput2.name = "password";
    //                 mapInput2.value = "P@ssw0rd";
    //                 mapForm.appendChild(mapInput2);
    //
    //                 let mapInput3 = document.createElement("input");
    //                 mapInput3.type = "hidden";
    //                 mapInput3.name = "redir";
    //                 // mapInput3.value = "/course/modedit.php?sr=0&add=scorm&section=0&course=5&display=popup";
    //                 mapInput3.value = "/mod/scorm/player.php?a=1&scoid=2&display=popup&mode=normal";
    //                 mapForm.appendChild(mapInput3);
    //
    //                 document.body.appendChild(mapForm);
    //
    //                 let map = window.open("", "Map", "height=600,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");
    //
    //                 if (map) {
    //                     mapForm.submit();
    //                 } else {
    //                     alert('You must allow popups for this map to work.');
    //                 }
    //
    //             }}>
    //                 button
    //             </button>
    //
    //             <form action="http://10.30.1.10/moodle/login/index.php" target={"myIframe"} method="POST">
    //                 <button type={"submit"}>sumbit</button>
    //                 <input type="hidden" name={"username"} value={"admin"}/>
    //                 <input type="hidden" name={"password"} value={"P@ssw0rd"}/>
    //                 <input type="hidden" name={"redir"}
    //                        value={"/mod/scorm/player.php?a=1&scoid=2&display=popup&mode=normal"}/>
    //                 {/*<input type="hidden" name={"logintoken"} value={"a3f3a1ff1cd77bbbae1c6fe1e9a0d679"}/>*/}
    //             </form>
    //
    //             <iframe src="" name="myIframe" width={"1500px"} height={"800px"}> </iframe>
    //         </div>
    //     </>
    // );
}

export default App;
