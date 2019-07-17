import React from 'react'
import { Logo, Text } from '../shared'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import { Box, Flex } from 'rebass'
import { mq } from '../../globals'
import { FaCompass, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa'
import Item from './footer_item'

const Footer = props => {
	return (
		<Foter>
			<Container>
				<Box px={[ 2, 3, 3 ]}>
					<Heading py={[ 3, 4, 4 ]}>
						<Text textAlign='center'>
							<Logo color='rgba(255,255,255,.5)' to='/'>
								shopper
							</Logo>
						</Text>
					</Heading>
					<FlexWrapper
						p='2'
						justifyContent='space-between'
						flexWrap='wrap'
					>
						<Left>
							<Title>Contact information</Title>
							<LeftItem>
								<Box>
									<Item
										awesome={<FaCompass size='40' />}
										title='Adress'
										desc='Vojvode Putnika 134'
									/>
									<Item
										awesome={<FaClock size='40' />}
										title='Working hours'
										desc='Mon-Sun 24/7'
									/>
								</Box>
								<Box px={[ 3, 4, 5 ]} />
								<Box>
									<Item
										awesome={<FaPhone size='40' />}
										title='Phone'
										desc='123-123-123'
									/>
									<Item
										awesome={<FaEnvelope size='40' />}
										title='Email'
										desc='shopper@gmail.com'
									/>
								</Box>
							</LeftItem>
						</Left>
						<Right>
							<Title>Usefull tips for our customers</Title>
							<Text>
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit. Sapiente aut amet delectus
								unde iure tempore.
							</Text>
							<Text>
								Lorem ipsum dolor sit amet consectetur,
								adipisicing elit. Non, assumenda!
							</Text>
						</Right>
					</FlexWrapper>
				</Box>
			</Container>
		</Foter>
	)
}

export default Footer

const Foter = styled.footer`
	background-color: #242424;
	color: ${props => props.theme.colors.whites[6]};
`
const Heading = styled(Box)`
border-bottom:1px solid ${props => props.theme.colors.whites[4]};
`
const Title = styled.h2`
	text-align: center;
	font-family: ${props => props.theme.fonts.title};
	color: ${props => props.theme.colors.whites[4]};
	font-size: .9rem;
	${mq[2]} {
		text-align: left;
		font-size: 1.2rem;
	}
`
const Left = styled(Box)`
  flex:1 1 100%;
${mq[2]}{
  padding-right:3rem;
  flex:0 1 60%;
}
`
const Right = styled(Box)`
  flex:0 1 100%;

${mq[2]}{
  flex:0 1 40%;
}
`
const FlexWrapper = styled(Flex)`
justify-content:center;
${mq[2]}{
justify-content:space-between;
}
`
const LeftItem = styled(Flex)`
flex-wrap:wrap;
justify-content:center;
align-items:center;
${mq[2]}{
  justify-content:space-between;
}
`
