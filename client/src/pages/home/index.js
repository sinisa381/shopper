import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { Flex } from 'rebass'
import { Spacer } from '../../components/shared'
import { connect } from 'react-redux'
import { getProduct } from '../../redux/product/actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import HomeSlider from './home_slider'
import HomePromotion from './home_promotions'
import CardBlock from '../../components/utils/card/card_block'

const Home = props => {
  const [loading, setLoading] = useState(true)
  let didCancel = false
  useEffect(() => {
    setLoading(true)
    const products = async () => {
      try {
        if (!didCancel) {

          await props.dispatch(
            getProduct({ sortBy: 'sold', order: 'desc', limit: 4 })
          )
          await props.dispatch(getProduct({ order: 'asc', limit: 5 }))
          setLoading(false)
        }
      } catch {
        if (!didCancel) {
        setLoading(false)
        }
      }
    }
    products()
    return () => {
      didCancel = true
    }
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
      <Spacer pt={[3, 4, 5]} />
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
