import styled from 'styled-components'
import Slider from 'react-slick'
import Slick from './Slick'

interface itemsProps {
  item: string,
  name: string
}

const SliderItem = styled.div`
  width: 100%;
  img{
    max-width: 100%;
    height: auto;
  }
`;

const items:itemsProps[] = [
  {
    item: 'http://placehold.it/1200x400',
    name: '이미지01'
  },
  {
    item: 'http://placehold.it/1200x400/ff0000',
    name: '이미지02'
  },
  {
    item: 'http://placehold.it/1200x400/00ffff',
    name: '이미지03'
  },    
]

function Item() {
  return (
    <Slick>
      {items.map((item, index) => (
        <SliderItem key={index}>
          <img src={item.item} alt={item.name} />
        </SliderItem>
      ))}
    </Slick>
  );
}

export default Item;