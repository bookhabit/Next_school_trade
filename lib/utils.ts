import moment from 'moment';
import "moment/locale/ko";


//* "token=value" 를 {token:"value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    //* "token=value"
    const itemString = cookieString?.split(/\s*;\s*/);
    itemString.forEach((pairs) => {
      //* ["token","value"]
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.splice(1).join("=");
    });
  }
  return cookies;
};

//* 금액을 입력하면 금액에 ,를 넣어주는 함수
export const makeMoneyString = (input: string) => {
  const amountString = input.replace(/[^0-9]/g, "");
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return "";
};

// ,콤마가 들어있는 string을 number로 바꿔주기
export const makeMoneyNumber = (input: string) => {
  const price = input.replace(/,/g, "");
  return price;
};

// text 제한을 두어 ... 으로 변경하는 함수
export const convertToLongText = (input:string|undefined,maxCount:number)=>{
  if(input && input.length > maxCount){
    let firstText=""
    for(var count=0; count < maxCount; count++){
      firstText += input[count]
    }
    const lastText = " ..."
    const convertedText = firstText+lastText
    return convertedText
  }else{
    return input
  }
}

// 상대시간 변환
// dateTime 상대시간으로 출력하기
export const convertToDatetime = (date:string)=>{
  const now = moment();
    const updatedDate = moment(date);
    return updatedDate.from(now)
}