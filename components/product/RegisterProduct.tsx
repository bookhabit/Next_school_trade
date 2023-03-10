import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import PriceWonIcon from "../../public/static/svg/product/price_won.svg"
import MapIcon from "../../public/static/svg/product/map.svg"
import PositionIcon from "../../public/static/svg/product/register_position.svg"
import useModal from './../../hooks/useModal';
import SetPosition from '../map/setPosition';
import { useState, useMemo } from 'react';
import { makeMoneyString } from '../../lib/utils';
import Delete from "../../public/static/svg/product/thumnailXicon.svg"
import Slick from './Slick';

const Container = styled.div`
    /* 이미지 css */
    .register-image-box{
        width:100%;
        height:156px;
        display:flex;
        align-items:center;
        background-color:#FFFBFB;
        border-bottom:1px solid ${palette.divistion_color};
        overflow:hidden;
        .register-image-slide{
            width:100%;
            display:flex;
            align-items:center;
            .file-image-box{
                width:80px !important;
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
            
            .preview-image-box-wrap{
                width:70%;
                height:100%;
                display:flex;
                flex-direction:row;
                align-items:center;
                section{
                    width:100%;
                    .slick-slider{
                        width:100%;
                        .slick-arrow{
                            display:none !important;
                        }
                        .slick-track{
                            width:100%;
                            display:flex;
                            align-items:center;
                            .slick-slide{
                                width:80px !important;
                                height:80px !important;
                                margin-right:20px;
                                div{
                                    width:100%;
                                    height:100%;
                                    .preview-image-box{
                                        width:100%;
                                        height:100%;
                                        img{
                                            width:80px;
                                            height:80px;
                                            object-fit:fill;
                                            margin-right:20px;
                                            border-radius:10px;
                                        }
                                        .preview-image-delete-icon{
                                            position:relative;
                                            left:70px;
                                            bottom:83px;
                                            background-color:white;
                                            border-radius:50px;
                                        }
                                    }
                                }
                            }
                        }
                        .slick-dots{
                            display:none !important;
                        }
                    }
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
const SliderItem = styled.div`
  width: 100%;
  img{
    max-width: 100%;
    height: auto;
  }
`

const RegisterProduct = () => {
    const {openModal,ModalPortal,closeModal} = useModal();

    const [price,setPrice] = useState('');

    const onChangePrice = (e:any)=>{
        console.log(e.target.value)
        const commaPrice = makeMoneyString(String(e.target.value))
        setPrice(commaPrice)
    }

    // 썸네일 미리보기
    const [showImages, setShowImages] = useState<string[]>([]);
    console.log('showImages',showImages)

    // 이미지 상대경로 저장
    const handleAddImages = (event: any) => {
      const imageLists = event.target.files;
      console.log('imageLists',imageLists)
      let imageUrlLists = [...showImages]; // 하나씩 추가할 수도 있으니까
      console.log(imageUrlLists)
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
  
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
  
      setShowImages(imageUrlLists);
    }

      // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
        setShowImages(showImages.filter((_, index) => index !== id));
    };

    return (
        <Container>
            <div className='register-image-box'>
                <div className='register-image-slide'>
                    <div className='file-image-box'>
                        <label htmlFor='file-image'/>
                        <input 
                            name='file'
                            type="file" id="file-image" 
                            accept="image/png,image/jpg,image/jpeg"
                            multiple
                            onChange={handleAddImages}
                        />
                        <p className='file-image-count'>{showImages.length}/5</p>
                    </div>
                    <div className='preview-image-box-wrap'>
                        <Slick>
                            {showImages.map((image: string, id: number)  => (
                                <SliderItem key={id} className="preview-image-box">
                                <img src={image} alt={`${image}-${id}`} />
                                <Delete onClick={() => handleDeleteImage(id)} className="preview-image-delete-icon" />
                                </SliderItem>
                            ))}
                        </Slick>
                    </div>
                </div>
            </div>
            <div className='register-input-title'>
                <input type="text" placeholder='상품 제목을 입력해주세요.' />
            </div>
            <div className='register-input-price'>
                <PriceWonIcon/>
                <input type="text" placeholder='가격' value={price} onChange={onChangePrice}/> 
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