import React, { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import { Title, SubTitle, Text, Spacer } from '../../components/shared'
import produce from 'immer'
import Theme from '../../globals/theme'
import { connect } from 'react-redux'
import { Box, Card, Flex } from 'rebass'
import { getBrand, getWood } from '../../actions/product_actions'
import CollapseCheckbox from '../../components/utils/form/collapse_checkbox'

import CircularProgess from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'

import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

import {
  staticFrets,
  staticPrice
} from '../../components/utils/form/fixed_categories'
import { getProductsToShop } from '../../actions/product_actions'

const useStyles = makeStyles(theme => ({
  root: {
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

const Shop = props => {
  const classes = useStyles()
  const [loadingBrand, setLoadingBrand] = useState(false)
  const [loadingWood, setLoadingWood] = useState(false)
  const [state, setState] = useImmer(initialState)
  const { brand, wood, frets, price } = state.filters
  useEffect(() => {
    const dataToSubmit = removeCheckedFromFilters(state.filters)

    props.dispatch(getProductsToShop(state.skip, state.limit, dataToSubmit))
  }, [brand, wood, frets, price, state.skip, state.limit])

  function removeCheckedFromFilters(filtersData) {
    const dataToSubmit = {}
    for (let key in filtersData) {
      if (key === 'price') {
        let arr = []
        filtersData[key].forEach(item => {
          arr.push(item.array)
          dataToSubmit[key] = arr
        })
      } else {
        let arr = []
        filtersData[key].forEach(item => {
          arr.push(item._id)
          dataToSubmit[key] = arr
        })
      }
    }
    return dataToSubmit
  }
  function handleChange({ event, _id }, type) {
    setState(draft => {
      const index = draft[type].findIndex(item => item._id === _id)
      const data = draft[type]
      data[index].checked = event.target.checked
      const sorted = draft[type].filter(item => item.checked === true)
      draft.filters[type] = sorted
    })
  }
  function computeState(data) {
    const newData = produce(data, draft => {
      draft.forEach(item => (item.checked = false))
    })
    return newData
  }
  useEffect(() => {
    setState(draft => {
      draft.price = staticPrice
    })
  }, [])
  useEffect(() => {
    const Frets = computeState(staticFrets)
    setState(draft => {
      draft.frets = Frets
    })
    setLoadingBrand(true)
    setLoadingWood(true)
    props.dispatch(getBrand()).then(res => {
      setLoadingBrand(false)
      const brands = computeState(res.payload.brand)
      setState(draft => {
        draft.brand = brands
      })
    })
    props.dispatch(getWood()).then(res => {
      setLoadingWood(false)
      const woods = computeState(res.payload.wood)
      setState(draft => {
        draft.wood = woods
      })
    })
  }, [])
  console.log(props.product)
  return (
    <>
      <Container>
        <Spacer />
        <Flex flexWrap='wrap'>
          <Box width={[1, 1 / 4]} bg='blue'>
            {/* <Flex justifyContent='center'>
							<CircularProgess />
						</Flex> */}
            <Card pb='2' mb='2'>
              <List
                component='nav'
                aria-labelledby='nested-list-subheader'
                subheader={
                  <ListSubheader component='div' id='nested-list-subheader'>
                    Browse Products
                  </ListSubheader>
                }
                className={classes.root}
              >
                <CollapseCheckbox
                  formdata={state.brand}
                  title={'Brands'}
                  init={false}
                  change={element => handleChange(element, 'brand')}
                />
                <CollapseCheckbox
                  formdata={state.wood}
                  init={false}
                  title={'Woods'}
                  change={element => handleChange(element, 'wood')}
                />
                <CollapseCheckbox
                  formdata={state.frets}
                  init={true}
                  title={'Frets'}
                  change={element => handleChange(element, 'frets')}
                />

                <CollapseCheckbox
                  formdata={state.price}
                  init={true}
                  title={'Price'}
                  change={element => handleChange(element, 'price')}
                />
              </List>
            </Card>
          </Box>
          <div>
            <Box width={[1, 3 / 4]} bg='red'>
              wood
            </Box>
          </div>
        </Flex>
      </Container>
    </>
  )
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Shop)
