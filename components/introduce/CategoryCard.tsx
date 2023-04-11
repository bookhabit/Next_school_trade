import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { useRouter } from 'next/router';
const Container = styled.div`
    width:400px;
    margin-top:20px;
    margin-left:30px;
    padding:10px;
    display:flex;
    flex-wrap : wrap;
    .introduce-category-item{
        background-color:${palette.main_color};
        border-radius:20px;
        width:auto;
        height:40px;
        margin:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:10px;
        cursor:pointer;
        p{
            font-size:18px;
            color:${palette.main_text_color};
        }
        &:hover{
            background-color:${palette.text_hover};
        }
    }
`



const CategoryCard = () => {
    const router = useRouter();
    return (
        <Container>
            <div className='introduce-category-item' onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"electronic"},
                    },
                    "/category")
                    }}>
                <p>전자제품</p>
            </div>
            <div className='introduce-category-item'  onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"book"},
                    },
                    "/category")
                    }}>
                <p>책/교재</p>
            </div>
            <div className='introduce-category-item' onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"sports"},
                    },
                    "/category")
                    }}>
                <p>스포츠/레저</p>
            </div>
            <div className='introduce-category-item' onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"lecture"},
                    },
                    "/category")
                    }}>
                <p>강의자료</p>
            </div>
            <div className='introduce-category-item' onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"furniture"},
                    },
                    "/category")
                    }}> 
                <p>가구/주방</p>
            </div>
            <div className='introduce-category-item' onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"householdGoods"},
                    },
                    "/category")
                    }}>
                <p>생활용품</p>
            </div>
            <div className='introduce-category-item'onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"hobby"},
                    },
                    "/category")
                    }} >
                <p>취미/게임</p>
            </div>
            <div className='introduce-category-item'  onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"beauty"},
                    },
                    "/category")
                    }}>
                <p>뷰티/미용</p>
            </div>
            <div className='introduce-category-item' onClick={() => {
                    router.push({
                    pathname: '/home/[name]',
                    query: { name:"clothes"},
                    },
                    "/category")
                    }} >
                <p>의류</p>
            </div>
        </Container>
    );
};

export default CategoryCard;