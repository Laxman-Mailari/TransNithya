
export interface bus{
    busNumber: string;
    routeNumber: string;
    speed: number;
    seatMatrix: passenger[];
    stops: stop[];
    startTime: string;
    runningDate: number;
}

export interface stop{
    name: string;
    locations: Location;
    distance: number;
    time: string;
}

export interface Location{
    latitude: string;
    longitude: string;
}

export interface passenger{
    seatNumber: number;
    name: string;
    gender: string;
    source: string;
    destination: string;
    myDate: string;
    phoneNumber: number;
    mailid: string;
    status: string;

}