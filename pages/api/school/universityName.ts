import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const universityName = readFileSync("data/universityName.csv", "utf-8");
    
    if (!universityName) {
      return res.send("학교 데이터베이스가 비어있습니다.");
    }

    const splited = universityName.split("\n");

    let universityNamesArray: string[] = [];

    for (var i = 1; i < splited.length; i++) {
      const school_splited = splited[i].split(",");
      // console.log("university : ", school_splited[4])
      universityNamesArray.push(school_splited[4]);
    }

    // 2차원 배열로 1차원배열로 바꿈
    let universityNames: string[] = [];
    universityNamesArray.forEach((element) => {
      universityNames = universityNames.concat(element);
    });

    res.statusCode = 200;

    // console.log(universityNames)
    return res.send(universityNames);
  }

  res.statusCode = 405;

  return res.end();
};
