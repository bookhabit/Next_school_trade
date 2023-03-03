import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import LinkModal from './LinkModal';

const Container = styled.div`
    position:sticky;
    position:absolute;
    bottom:0px;        
    right:0px;

    .linkModal{
        background-color:${palette.main_color};
        border-radius:20px;
        width:140px;
        height:175px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        margin-right:25px;
        p{
            color:${palette.main_text_color};
            font-size:20px;
            font-weight:700;
            cursor: pointer;
            margin-top:10px;
            margin-bottom:10px;
        }
        p:hover{
            color:${palette.text_hover}
        }

    }
    .linkFooter{
        text-align:right;
        margin-top:5px;
        margin-right:25px;
        margin-bottom:30px;
        button{
            width:60px;
            height:60px;
            background-color:${palette.main_color};
            border-radius:50px;
            color:${palette.main_text_color};
            font-size:30px;
            font-weight:bold;
            cursor: pointer;
        }
        button:hover{
            background-color:${palette.btn_hover}
        }
        
    }

`

const LinkFooter = () => {
    const [showLinkModal,setShowLinkModal] = useState(false)

    const toggleModal = ()=>{
        setShowLinkModal(!showLinkModal)
    }

    return (
        <Container>
            {showLinkModal?<LinkModal/>:null}
            <div className='linkFooter'>
                <button onClick={toggleModal}>+</button>
            </div>
        </Container>
    );
};

export default LinkFooter;