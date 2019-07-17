import React from 'react'
import { Link } from 'react-router-dom'
import { mq } from '../../globals'
import { Card, Box } from 'rebass'
import Button from '@material-ui/core/Button'
import { Title, SubTitle } from '../../components/shared'
import styled from 'styled-components'

const HomePromotion = props => {
	const promotion = {
		img: '/images/featured/featured_home_3.jpg',
		lineOne: '50% On Weekends',
		lineTwo: 'In second hand guitars',
		linkTitle: 'Shop now',
		linkTo: '/shop'
	}

	return (
		<div>
			<Title
				fontWeight='400'
				fontSize={[ 4, 5, 6 ]}
				color='red'
				textAlign='center'
				my='4'
			>
				Promotions
			</Title>
			<StyledCard
				backgroundImage={`url(${promotion.img})`}
				backgroundSize='cover'
				backgroundPosition='center'
				borderRadius={8}
				color='white'
			>
				<Box ml='auto' mr='4' mb='4' mt='auto'>
					<Box bg='blacks.6'>
						<Title px='3' pt='2'>
							{promotion.lineOne}
						</Title>
						<SubTitle px='3' pb='3'>
							{promotion.lineTwo}
						</SubTitle>
					</Box>
					<Button
						variant='contained'
						color='primary'
						size='small'
						component={Link}
						to={promotion.linkTo}
					>
						{promotion.linkTitle}
					</Button>
				</Box>
			</StyledCard>
		</div>
	)
}

export default HomePromotion

const StyledCard = styled(Card)`
text-align:right;
display:flex;
margin:0 auto;
width:100%;
height:50vh;
${mq[1]}{
height:60vh;
width:70%;
}
${mq[2]}{
height:70vh;
width:80%;
}
`
