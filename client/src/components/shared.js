import React from 'react'
import { mq } from '../globals'
import theme from '../globals/theme'
import Color from 'color'
import Papir from '@material-ui/core/Paper'
import {
  Box,
  Image,
  Flex,
  Text as Txt,
  Card,
  Button as Btn,
  Heading
} from 'rebass'

import { Link as ReactLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const imageNotAvailable = '/images/image_not_available.png'

export const ImageDefault = ({ images, name }) => {
  if (images.length > 0) {
    return <Image src={images[0]} alt={name} height={'50px'} borderRadius={2} />
  }
  return <Image src={imageNotAvailable} height={'200px'} borderRadius={2} />
}

export const CardGrid = styled.div`
  /* background-color: #000; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(180px, 220px));
  /* grid-template-columns: repeat(2, 1fr); */
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  grid-gap: 5px;
`
export const Link = styled(ReactLink)`
  text-decoration: none;
  color: ${props => (props.color ? props.color : 'black')};
  font-family: ${theme.fonts.title};
`

export const BtnDefault = props => (
  <Button fontFamily='body' {...props}>
    <LinkDefault to={props.linkTo}>{props.children}</LinkDefault>
  </Button>
)

const LinkDefault = styled(ReactLink)`
  color: inherit;
  text-decoration: none;
`

export const Button = styled(Btn)`
  cursor: pointer;
  outline: none;
  &:active {
    outline: none;
  }
`

export const ErrorMsg = props => (
  <Txt fontFamily='subtitle' color='red' fontSize={[1, 2, 2]} {...props}>
    {props.children}
  </Txt>
)

export const Title = props => (
  <Heading
    fontSize={[3, 4, 5]}
    fontFamily='title'
    lineHeight='title'
    {...props}
  >
    {props.children}
  </Heading>
)
export const Text = props => (
  <Txt
    as='p'
    mr={props.mr}
    fontFamily='body'
    fontSize={[1, 2, 3]}
    lineHeight='copy'
    {...props}
  >
    {props.children}
  </Txt>
)
export const SubTitle = props => (
  <Txt
    as='h2'
    fontFamily='subtitle'
    fontSize={[2, 3, 4]}
    lineHeight='title'
    {...props}
  >
    {props.children}
  </Txt>
)

export const Spacer = props => <Box mt={[3, 4, 5]} {...props} />
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.5rem;
`

export const Logo = styled(ReactLink)`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${props => (props.color ? props.color : '#fff')};
  margin: 0;
  text-transform: capitalize;
  text-decoration: none;
  font-family: ${props => props.theme.fonts.body};
`

let darker = Color('#242424').lighten(0.6)

const navItemCSS = css`
  cursor: pointer;
  font-size: 1rem;
  padding: 4px 0;
  font-family: ${theme.fonts.body};
  text-decoration: none;
  font-size: 0.6rem;
  margin-top: 0.5rem;
  color: #fff;
  padding: 8px 20px;
  padding-left: 2.4rem;
  font-variant: 'small-caps';
  transition: all 0.3s;
  &:hover {
    background-color: ${darker.hsl().toString()};
  }
`
export const NavItem = styled(Link)`
  ${navItemCSS}
`
export const NavItemNoLink = styled.div`
  ${navItemCSS};
`

export const Paper = styled(Papir)`
  padding: 0.4rem 0.8rem;
  margin-bottom: ${props => (props.mb ? props.mb : 0)};
`

export const Circle = styled.span`
  width: 7px;
  height: 7px;
  display: inline-block;
  border-radius: 100%;
  background-color: ${theme.colors.red};
  margin-left: ${props => (props.nav ? '10px' : '-14px')};
  padding: 0.5rem;
  position: relative;
`

export const Count = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8px;
`
