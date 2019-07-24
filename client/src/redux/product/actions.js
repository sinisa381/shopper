import axios from 'axios'
import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_BRAND,
  GET_WOOD,
  GET_PRODUCTS_TO_SHOP
} from './types'
import { PRODUCT_SERVER } from '../../components/utils/misc'

export function getProductBySell(data) {
  return {
    type: GET_PRODUCT_BY_SELL,
    payload: data
  }
}

export function getProductByArrival(data) {
  return {
    type: GET_PRODUCT_BY_ARRIVAL,
    payload: data
  }
}

export function getProduct({ sortBy = '_id', order, limit = 100 }) {
  return dispatch => {
    axios
      .get(
        `${PRODUCT_SERVER}/articles?sortBy=${sortBy}&order=${order}&limit=${limit}`
      )
      .then(res => {
        if (sortBy === 'sold') {
          dispatch(getProductBySell(res.data))
        } else {
          dispatch(getProductByArrival(res.data))
        }
      })
  }
}

export const getComputedBrand = brands => {
  return {
    type: GET_BRAND,
    payload: brands
  }
}

export const getBrand = () => {
  return dispatch => {
    axios.get(`${PRODUCT_SERVER}/brands`).then(res => {
      dispatch(getComputedBrand(res.data.brand))
    })
  }
}

export const getComputedWood = woods => {
  return {
    type: GET_WOOD,
    payload: woods
  }
}

export const getWood = () => {
  return dispatch => {
    axios.get(`${PRODUCT_SERVER}/woods`).then(res => {
      return dispatch(getComputedWood(res.data.wood))
    })
  }
}

export function dispatchProductsToShop(products) {
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: products
  }
}

export function getProductsToShop(
  skip,
  limit,
  filters = [],
  previousState = []
) {
  const data = { limit, skip, filters }
  return dispatch => {
    axios.post(`${PRODUCT_SERVER}/shop`, data).then(response => {
      const products = {
        size: response.data.size,
        articles: response.data.articles
      }
      dispatch(dispatchProductsToShop(products))
    })
  }
}
