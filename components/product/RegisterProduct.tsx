import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import PriceWonIcon from "../../public/static/svg/product/price_won.svg"
import MapIcon from "../../public/static/svg/product/map.svg"
import PositionIcon from "../../public/static/svg/product/register_position.svg"
import useModal from './../../hooks/useModal';
import SetPosition from '../map/setPosition';

const Container = styled.div`
    /* 이미지 css */
    .register-image-box{
        width:100%;
        height:156px;
        display:flex;
        align-items:center;
        background-color:#FFFBFB;
        border-bottom:1px solid ${palette.divistion_color};
        .register-image-slide{
            display:flex;
            align-items:center;
            .file-image-box{
                width:80px;
                height:80px;
                margin:0px 20px;
                background-color:#A19B9B;
                border-radius:10px;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                label{
                    background-image:url("/static/svg/product/register_image.svg");
                    background-position:center;
                    background-repeat:no-repeat;
                    width: 25px;
                    height: 30px;
                }
                input[type="file"] {
                    display:none;
                }
                .file-image-count{
                    position:relative;
                    font-size:15px;
                    font-weight:bold;
                    
                }
            }
            
            .preview-image-box{
                img{
                    width:80px;
                    height:80px;
                    object-fit:fill;
                    margin-right:20px;
                    border-radius:10px;
                }
                /* x 아이콘 - 삭제버튼표시하기 */
                span{
                    background-image:url("/static/svg/map/modal_close_x_icon.svg");
                }
            }

        }
    }

    /* 제목 css */
    .register-input-title{
        width:100%;
        height:70px;
        padding:20px;
        input{
            font-size:20px;
        }
        border-bottom:1px solid ${palette.divistion_color}
    }

    /* 가격 css */
    .register-input-price{
        width:100%;
        height:50px;
        padding:15px 20px;
        display:flex;
        align-items:center;
        border-bottom:1px solid ${palette.divistion_color};
        svg{
            margin-right:5px;
        }
        input{
            width:80px;
        }
    }

    /* 설명 css */
    .register-input-desc{
        padding:10px 20px;
        min-height:170px;
        border-bottom:1px solid ${palette.divistion_color};
        textarea{
            width:100%;
            border:none;
            outline:none;
            padding:10px;
            min-height:150px;
            line-height:20px;
        }
    }


    /* 카테고리 css */
    .register-select-category{
        width:100%;
        height:50px;
        padding:15px 20px;
        border-bottom:1px solid ${palette.divistion_color};
        select{
            width:350px;
            border:none;
            outline:none;
        }
    }

    /* 지도 모달창 연결 css */
    .register-setPosition-modal{
        display:flex;
        align-items:center;
        background-color:#EDEBEB;
        width:100%;
        height:80px;
        padding:0px 20px;
        border-bottom:1px solid ${palette.divistion_color};
        svg{
            margin-right:10px;
        }
        p{
            font-size:20px;
        }
    }

    /* 위치 인풋받기 css */
    .register-setPosition-input{
        width:100%;
        height:60px;
        display:flex;
        align-items:center;
        border-bottom:1px solid ${palette.divistion_color};
        padding:0px 20px;
        svg{
            margin-right:10px;
            // 크기조절
        }
        input{
            background-color:#FAF8F8;
            width:310px;
            height:40px;
            padding:3px 12px;
        }
        
    }

    /* 푸터 css */
    .register-footer{
        position:fixed;
        bottom:0;   
        background-color:${palette.main_color};
        width:100%;
        height:70px;
        button{
            float:right;
            margin:15px 20px;
            width:100px;
            height:45px;
            background-color:${palette.orange_btn};
            border-radius:50px;
            color:${palette.main_text_color};
            font-size:20px;
            font-weight:bold;
            text-align:center;
            padding:5px;
            line-height: 18px;
        }
    }
`


const RegisterProduct = () => {
    const {openModal,ModalPortal,closeModal} = useModal();
    return (
        <Container>
            <div className='register-image-box'>
                <div className='register-image-slide'>
                    <div className='file-image-box'>
                        <label htmlFor='file-image'/>
                        <input type="file" id="file-image" />
                        <p className='file-image-count'>2/5</p>
                    </div>
                    <div className='preview-image-box'>
                        <p></p>
                        <img src="/static/svg/product/testProductImage.png" alt="상품이미지"/>
                    </div>
                    <div className='preview-image-box'>
                        <img src="/static/svg/product/testProductImage.png" alt="상품이미지"/>
                    </div>
                </div>
            </div>
            <div className='register-input-title'>
                <input type="text" placeholder='상품 제목을 입력해주세요.' />
            </div>
            <div className='register-input-price'>
                <PriceWonIcon/>
                <input type="text" placeholder='가격'/> 
            </div>
            <div className='register-input-desc'>
                <textarea placeholder='상품에 대해서 설명해주세요.'/>
            </div> 
            <div className='register-select-category'>
                <select name="category">
                    <option disabled>카테고리</option>
                    <option value="electronic">전자제품</option>
                    <option value="clothes">의류</option>
                    <option value="lecture">강의자료</option>
                    <option value="furniture">가구/주방</option>
                    <option value="book">책</option>
                    <option value="householdGoods">생활용품</option>
                    <option value="sports">스포츠/레저</option>
                    <option value="hobby">취미/게임</option>
                    <option value="beauty">뷰티/미용</option>
                </select>
            </div>
            <div className='register-setPosition-modal'>
                <MapIcon/>
                <p onClick={openModal}>거래 희망 장소 지도로 설정하기</p>
            </div>
            <div className='register-setPosition-input'>
                <PositionIcon/>
                <input type="text" placeholder='거래 희망장소명 입력'/>
            </div>
            <div className='register-footer'>
                <button>등록하기</button>
            </div>
            <ModalPortal>
                <SetPosition closeModal={closeModal}/>
            </ModalPortal>
        </Container>
    );
};

export default RegisterProduct;