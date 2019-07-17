import React from 'react'
import styled from 'styled-components'
import { Title } from '../shared'
import Card from './card'

const CardBlock = ({ list, title }) => {
	return (
		<React.Fragment>
			<Title
				fontWeight='400'
				fontSize={[ 4, 5, 6 ]}
				textAlign='center'
				my='4'
			>
				{title}
			</Title>
			<Grid>
				{list ? (
					list.article.map(item => <Card key={item._id} {...item} />)
				) : null}
			</Grid>
		</React.Fragment>
	)
}

export default CardBlock

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minMax(256px, 320px));
	justify-content: center;
	width: 100%;
	margin: 0 auto;
	grid-gap: 5px;
`
