import {Scorm} from "./ResponseScorm";

export interface ResponseCourse {
    courses: Course[]
}

export interface Course {
    "id": number,
    "fullname": string,
    "displayname": string,
    "shortname": string,
    "categoryid": number,
    "categoryname": string,
    "sortorder": number,
    "summary": string,
    "summaryformat": number,
    "summaryfiles": any[],
    "overviewfiles": any[],
    "showactivitydates": boolean,
    "showcompletionconditions": boolean,
    "contacts": {
        "id": number,
        "fullname": string
    }[],
    "enrollmentmethods": string[],
    "idnumber": string,
    "format": string,
    "showgrades": number,
    "newsitems": number,
    "startdate": number,
    "enddate": number,
    "maxbytes": number,
    "showreports": number,
    "visible": number,
    "groupmode": number,
    "groupmodeforce": number,
    "defaultgroupingid": number,
    "enablecompletion": number,
    "completionnotify": number,
    "lang": string,
    "theme": string,
    "marker": number,
    "legacyfiles": number,
    "calendartype": string,
    "timecreated": number,
    "timemodified": number,
    "requested": number,
    "cacherev": number,
    "filters": {
        "filter": string,
        "localstate": number,
        "inheritedstate": number
    }[],
    "courseformatoptions": {
        "name": string,
        "value": number
    }[],
    scorms: Scorm[]
}