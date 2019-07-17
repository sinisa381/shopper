import axios from 'axios'
import {
	GET_PRODUCT_BY_ARRIVAL,
	GET_PRODUCT_BY_SELL,
	GET_BRAND,
	GET_WOOD,
	GET_PRODUCTS_TO_SHOP
} from './types'
import { PRODUCT_SERVER } from '../components/utils/misc'

export function getProduct({ sortBy, order, limit }) {
	const request = axios
		.get(
			`${PRODUCT_SERVER}/articles?sortBy=${sortBy}&order=${order}&limit=${limit ||
				100}`
		)
		.then(res => res.data)
	if (sortBy === 'sold') {
		return {
			type: GET_PRODUCT_BY_SELL,
			payload: request
		}
	}
	return {
		type: GET_PRODUCT_BY_ARRIVAL,
		payload: request
	}
}

export function getBrand() {
	const request = axios.get(`${PRODUCT_SERVER}/brands`).then(res => res.data)
	return {
		type: GET_BRAND,
		payload: request
	}
}

export function getWood() {
	const request = axios.get(`${PRODUCT_SERVER}/woods`).then(res => res.data)
	return {
		type: GET_WOOD,
		payload: request
	}
}

export function getProductsToShop(
	skip,
	limit,
	filters = [],
	previousState = []
) {
	const data = { limit, skip, filters }
	const request = axios
		.post(`${PRODUCT_SERVER}/shop`, data)
		.then(response => {
			return {
				size: response.data.size,
				articles: response.data.articles
			}
		})
	return {
		type: GET_PRODUCTS_TO_SHOP,
		payload: request
	}
}
