import React from 'react'
import CardBlockShop from '../../components/utils/card/card_block_shop'

const Loadmore = props => {
  const { grid, product } = props
  return <CardBlockShop grid={grid} list={product} />
}

export default Loadmore
