//* 1월부터 12월까지 - 회원가입 월 셀렉터
export const monthList = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  
//* 1부터 31일까지
export const dayList = Array.from(Array(31),(_,i)=>String(i+1));

//* 2023년부터 1900년까지
export const yearList = Array.from(Array(124),(_,i)=>String(2023-i));

// 대학교
export const universityList = [
    "한서대학교",
    "서울대학교",
    "고려대학교",
    "연세대학교",
  ];

// 대학교에 해당하는 학과
export const majorList = [
    "항공교통물류학부",
    "항공운항항과",
    "항공기계학과",
    "항공관광학과",
  ];

// 상품 등록 카테고리
export const productCategoryList = [
  "전자제품",
  "책/교재",
  "스포츠/레저",
  "강의자료",
  "가구/주방",
  "생활용품",
  "의류",
  "취미/게임",
  "뷰티/미용"
]