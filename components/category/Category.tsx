import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import ElectronicIcon from "../../public/static/svg/category/electronic.svg"
import ClothesIcon from "../../public/static/svg/category/clothes.svg"
import LectureIcon from "../../public/static/svg/category/lecture.svg"
import ChairIcon from "../../public/static/svg/category/chair.svg"
import BookIcon from "../../public/static/svg/category/book.svg"
import PencilIcon from "../../public/static/svg/category/pencil.svg"
import BallIcon from "../../public/static/svg/category/ball.svg"
import MouthIcon from "../../public/static/svg/category/mouth.svg"
import HandIcon from "../../public/static/svg/category/hand.svg"
import { useRouter } from 'next/router';

const Container = styled.div`
    padding:50px 20px;
    display: flex;
    gap: 20px 2%;
    flex-wrap: wrap;
    .category-box{
        width: 32%;
        height:130px;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:20px 0px;
        margin:20px 0px;
        div{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
        }
        p{
            display:inline-block;
            font-size:20px;
            margin-top:15px;
        }
    }
    
`


const Category = () => {

    const router= useRouter();
    // router.push('/')
    return (
        <Container>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"electronic"},
                    },
                    "/category")
                    }}>
                    <ElectronicIcon/>
                    <p>전자제품</p>
                </div>
            </div>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"clothes"},
                    },
                    "/category")
                    }}>
                    <ClothesIcon/>
                    <p>의류</p>
                </div>
            </div>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"lecture"},
                    },
                    "/category")
                    }}>
                    <LectureIcon/>
                    <p>강의자료</p>
                </div>
            </div>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"furniture"},
                    },
                    "/category")
                    }}>
                    <ChairIcon/>
                    <p>가구/주방</p>
                </div>
            </div>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"book"},
                    },
                    "/category")
                    }}>
                    <BookIcon/>
                    <p>책</p>
                </div>
            </div>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"householdGoods"},
                    },
                    "/category")
                    }}>
                    <PencilIcon/>
                    <p>생활용품</p>
                </div>
            </div>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"sports"},
                    },
                    "/category")
                    }}>
                    <BallIcon/>
                    <p>스포츠/레저</p>
                </div>
            </div>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"hobby"},
                    },
                    "/category")
                    }}>
                    <MouthIcon/>
                    <p>취미/게임</p>
                </div>
            </div>
            <div className='category-box'>
                <div onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"beauty"},
                    },
                    "/category")
                    }}>
                    <HandIcon/>
                    <p>뷰티/미용</p>
                </div>
            </div>
        </Container>
    );
};

export default Category;