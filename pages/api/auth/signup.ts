import { NextApiRequest,NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt from "bcryptjs"
import { StoredUserType } from "../../../types/user";
import jwt  from "jsonwebtoken";

export default async (req:NextApiRequest,res:NextApiResponse)=>{
    if(req.method==="POST"){
        const {userName,userNickname,studentID,email,password,university,birthDay} = req.body;
        
        // req.body의 값이 유효한지 확인하기
        if(!userName|| !userNickname || !studentID || !email || !password ||!university || !birthDay){
            res.statusCode = 400;
            return res.send("필수 데이터가 없습니다.")
        }

        // 유저의 이메일이 존재하는지 확인하기
        const userExist = Data.user.exist({email});
        if(userExist){
            res.statusCode = 409;
            return res.send("이미 가입된 이메일입니다.")
        }

        // 비밀번호 암호화
        const hashedPassword = bcrypt.hashSync(password,8)

        // 유저 정보 추가
        const users = Data.user.getList();
        let userId;
        if(users.length===0){
            userId = 1;
        }else{
            userId= users[users.length-1].id+1;
        }
        const newUser:StoredUserType={
            id:userId,
            userName,
            userNickname,
            studentID,
            email,
            password:hashedPassword,
            university,
            birthDay,
            profileImage:"/static/image/user/default_user_profile_image.jpg"
        }

        Data.user.write([...users,newUser])        

        // jwt 토큰 생성
        const token = jwt.sign(String(newUser.id),process.env.JWT_SECRET!)
        
        // access-token 생성
        res.setHeader(
            "Set-Cookie",
            `access_token=${token};path=/;expires=${new Date(Date.now()+60+60*24*1000*3).toUTCString()};httponly`
        )

        // 비밀번호 제외한 유저정보를 저장할 변수 (타입지정)
        const newUserWithoutPassword:Partial<Pick<StoredUserType,"password">>= newUser;

        // delete 사용하여 객체의 속성제거
        delete newUserWithoutPassword.password;

        res.statusCode = 200;
        return res.send(newUserWithoutPassword);

    }
        res.statusCode=405;

        return res.end();
}
