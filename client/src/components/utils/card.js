import React from 'react'
import { Card } from 'rebass'
import { SubTitle, Text, ImageDefault } from '../shared'
import { Paper } from '@material-ui/core'

export default ({ brand, name, price, images }) => {
  return (
    // TODO: description when grid changes

    <React.Fragment>
      <Card width={[256, 320]} mx='auto' p={2}>
        <Paper>
          <ImageDefault
            images={images}
            height={[1 / 3, 2 / 3, 1]}
            name={name}
          />
          <SubTitle textAlign='center' color='blue'>
            {brand.name}
          </SubTitle>
          <Text textAlign='center' fontWeight={600}>
            {name}
          </Text>
          <Text pb={[2, 3]} textAlign='center' color='green'>
            $ {price}
          </Text>
        </Paper>
      </Card>
    </React.Fragment>
  )
}
