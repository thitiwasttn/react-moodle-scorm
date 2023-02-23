export interface Track {
    element: string;
    value: any;
}

export interface Data {
    attempt: number;
    tracks: Track[];
}

export interface ResponseScore {
    data: Data;
    warnings: any[];
}