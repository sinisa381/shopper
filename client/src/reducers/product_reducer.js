import {
	GET_PRODUCT_BY_SELL,
	GET_PRODUCT_BY_ARRIVAL,
	GET_BRAND,
	GET_WOOD,
	GET_PRODUCTS_TO_SHOP
} from '../actions/types'
export default function(state = {}, action) {
	switch (action.type) {
		case GET_PRODUCTS_TO_SHOP:
			return {
				...state,
				toShop: action.payload.articles,
				toShopSize: action.payload.size
			}
		case GET_PRODUCT_BY_SELL:
			return { ...state, bySell: action.payload }
		case GET_PRODUCT_BY_ARRIVAL:
			return { ...state, byArrival: action.payload }
		case GET_BRAND:
			return { ...state, brands: action.payload }
		case GET_WOOD:
			return { ...state, woods: action.payload }
		default:
			return state
	}
}
