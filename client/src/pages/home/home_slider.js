import React from 'react'
import { theme, mq } from '../../globals'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { Card, Box } from 'rebass'
import Button from '@material-ui/core/Button'
import { Title, SubTitle } from '../../components/shared'
import styled from 'styled-components'
const HomeSlider = props => {
  const slides = [
    {
      img: '/images/featured/featured_home.jpg',
      lineOne: 'Fender',
      lineTwo: 'Custom shop',
      linkTitle: 'Shop now',
      linkTo: '/shop'
    },
    {
      img: '/images/featured/featured_home_2.jpg',
      lineOne: 'B-Stock',
      lineTwo: 'Awesome discounts',
      linkTitle: 'View offers',
      linkTo: '/shop'
    }
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true
  }

  const generateSlides = () =>
    slides &&
    slides.map((item, i) => (
      <React.Fragment key={i}>
        <StyledCard
          backgroundImage={`url(${item.img})`}
          backgroundSize='cover'
          backgroundPosition='center'
          borderRadius={8}
          color='white'
        >
          <Box ml='4' mb='4' mt='auto'>
            <Box bg='blacks.6'>
              <Title px='3' pt='2'>
                {item.lineOne}
              </Title>
              <SubTitle px='3' pb='3'>
                {item.lineTwo}
              </SubTitle>
            </Box>
            <Button
              variant='contained'
              color='primary'
              size='small'
              component={Link}
              to={item.linkTo}
            >
              {item.linkTitle}
            </Button>
          </Box>
        </StyledCard>
      </React.Fragment>
    ))

  return (
    <React.Fragment>
      <ArrowButton>
        <Slider {...settings}>{generateSlides()}</Slider>
      </ArrowButton>
    </React.Fragment>
  )
}

export default HomeSlider

const ArrowButton = styled.div`
  .slick-next {
    margin-right: 20px;
  }
  button {
    display: none !important;
    ${mq[1]} {
      display: block !important;
    }
    &:before {
      color: ${theme.colors.blue};
      cursor: pointer;
      transition: all 0.3s;
      font-size: 2rem;
    }
    &:hover {
      &:before {
        color: pink;
      }
    }
  }
`
const StyledCard = styled(Card)`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 50vh;
  ${mq[1]} {
    height: 60vh;
    width: 70%;
  }
  ${mq[2]} {
    height: 70vh;
    width: 80%;
  }
`
