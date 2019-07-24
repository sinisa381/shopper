import React from 'react'
import { Title, CardGrid } from '../../shared'
import Card from './card'

const CardBlock = ({ list, title }) => {
  return (
    <React.Fragment>
      <Title fontWeight='400' fontSize={[4, 5, 6]} textAlign='center' my='4'>
        {title}
      </Title>
      <CardGrid>
        {list && list.article
          ? list.article.map(item => <Card key={item._id} {...item} />)
          : null}
      </CardGrid>
    </React.Fragment>
  )
}

export default CardBlock
