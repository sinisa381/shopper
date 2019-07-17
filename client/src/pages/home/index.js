import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { Flex } from 'rebass'
import { Spacer } from '../../components/shared'
import { connect } from 'react-redux'
import { getProduct } from '../../actions/product_actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import HomeSlider from './home_slider'
import HomePromotion from './home_promotions'
import CardBlock from '../../components/utils/card_block'

const Home = props => {
	const [ loading, setLoading ] = useState(true)
	useEffect(() => {
		props
			.dispatch(getProduct({ sortBy: 'sold', order: 'desc', limit: 4 }))
			.then(res => {
				return setLoading(false)
			})
	}, [])
	useEffect(() => {
		props.dispatch(getProduct({ order: 'asc', limit: 5 })).then(res => {
			return setLoading(false)
		})
	}, [])

	const showBlock = (title, list) => (
		<React.Fragment>
			{loading ? (
				<Flex justifyContent='center'>
					<CircularProgress />
				</Flex>
			) : (
				<CardBlock title={title} list={list} />
			)}
		</React.Fragment>
	)

	return (
		<Container>
			<Spacer />
			<HomeSlider />
			<Spacer />
			<HomePromotion />
			<Spacer />
			{showBlock('Best selling guitars', props.product.bySell)}
			<Spacer />
			{showBlock('New Arrivals', props.product.byArrival)}
			<Spacer />
		</Container>
	)
}

function mapStateToProps(state) {
	return {
		product: state.product
	}
}

export default connect(mapStateToProps)(Home)
