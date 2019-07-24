import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { computedWood, product } from '../../redux/product/product-selector'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from './drawer'
import { useImmer } from 'use-immer'
import { Spacer } from '../../components/shared'
import { connect } from 'react-redux'
import { Box, Card, Flex } from 'rebass'
import {
  getBrand,
  getWood,
  getProductsToShop
} from '../../redux/product/actions'
import LoadmoreCards from './loadmore-cards'
import CollapseCheckbox from '../../components/utils/form/collapse_checkbox'
import CollapseRadio from '../../components/utils/form/collapse_radio'

import Container from '@material-ui/core/Container'

import List from '@material-ui/core/List'

import {
  staticFrets,
  staticPrice
} from '../../components/utils/form/fixed_categories'

const Shop = props => {
  const classes = useStyles()
  const [state, setState] = useImmer(initialState)

  const handlePrice = value => {
    const data = staticPrice
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }
    return array
  }

  const handleFilters = (filters, category) => {
    if (category === 'price') {
      let priceValues = handlePrice(filters)
      setState(draft => {
        draft.filters[category] = priceValues
      })
    }
    setState(draft => {
      draft.filters[category] = filters
    })
  }

  function generateDataToSubmit(filtersData) {
    const dataToSubmit = {}
    for (let key in filtersData) {
      if (key == 'price') {
        const id = filtersData[key]
        let arr = []
        staticPrice.filter(item => {
          if (item._id === parseInt(id)) {
            arr = [...item.array]
            dataToSubmit[key] = arr
          }
        })
      } else {
        let arr = []
        filtersData[key].forEach(item => {
          arr.push(item)
          dataToSubmit[key] = arr
        })
      }
    }
    console.log(dataToSubmit)
    return dataToSubmit
  }

  const { brand, wood, frets, price } = state.filters
  useEffect(() => {
    let didCancel = false
    const dataToSubmit = generateDataToSubmit(state.filters)

    if (!didCancel) {
      props.dispatch(getProductsToShop(state.skip, state.limit, dataToSubmit))
    }
    return () => {
      didCancel = true
    }
  }, [brand, wood, frets, price])
  useEffect(() => {
    props.dispatch(getBrand())
    props.dispatch(getWood())
  }, [])
  const { brands, woods } = props.product
  const renderCardGrid = () => {
    return (
      <Card pb='2' mb='2' px='3'>
        <List
          component='nav'
          aria-labelledby='nested-list-subheader'
          className={classes.list}
        >
          <CollapseCheckbox
            formdata={brands}
            title={'Brands'}
            init={false}
            updateFilters={filters => handleFilters(filters, 'brand')}
          />
          <CollapseCheckbox
            formdata={woods}
            init={false}
            title={'Woods'}
            updateFilters={filters => handleFilters(filters, 'wood')}
          />
          <CollapseCheckbox
            formdata={staticFrets}
            init={true}
            title={'Frets'}
            updateFilters={filters => handleFilters(filters, 'frets')}
          />

          <CollapseRadio
            formdata={staticPrice}
            init={true}
            title={'Price'}
            updateFilters={filters => handleFilters(filters, 'price')}
          />
        </List>
      </Card>
    )
  }

  return (
    <>
      <Container>
        <Spacer />
        <Drawer render={closeDrawer => renderCardGrid(closeDrawer)}>
          <Box flex={['100%', '70%']}>
            <LoadmoreCards
              grid={state.grid}
              limit={state.limit}
              product={props.product.toShop}
              size={props.product.toShopSize}
              loadmore={() => console.log('loadmore')}
            />
          </Box>
        </Drawer>
      </Container>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(3)
  }
}))

const initialState = {
  grid: '',
  skip: 0,
  limit: 6,
  brand: [],
  wood: [],
  frets: [],
  price: [],
  filters: {
    brand: [],
    wood: [],
    frets: [],
    price: []
  }
}

const mapStateToProps = createStructuredSelector({
  wood: computedWood,
  product
})

export default connect(mapStateToProps)(Shop)
