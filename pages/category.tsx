import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ElectronicIcon from "../public/static/svg/category/electronic.svg"
import Category from '../components/category/Category';
import LinkFooter from '../components/footer/LinkFooter';

const category = () => {
    return (
        <>
            <Category/>
            <LinkFooter/>
        </>
    );
};

export default category;