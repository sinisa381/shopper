import { createSelector } from 'reselect'

export const selectProduct = state => state.product
export const selectBrand = state => state.brands
const productSelector = state => state.product

export const computedWood = createSelector(
  [selectProduct],
  product => product.brands
)

export const product = createSelector(
  [productSelector],
  product => product
)
