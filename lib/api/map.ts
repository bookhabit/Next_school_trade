import axios from "axios";

type GetLocationInfoAPIResponse = {
    latitude:number,
    longitude:number,
    country:string,
    city:string,
    district:string,
    streetAddress:string,
    postcode:string
}

// 현재 위치 정보 가져오기 api
export const getLocationInfoAPI = async ({latitude,longitude}:{latitude:number; longitude:number;})=> 
axios.get<GetLocationInfoAPIResponse>(`/api/map/location?latitude=${latitude}&longitude=${longitude}`)