import axios from "axios";

// 대학교 리스트 가져와서 selector option에 넣기
export const universityNamesList = async ()=>{
    const data = await axios.get("/api/school/universityName");
    console.log(data)
}
