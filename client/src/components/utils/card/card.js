import React from 'react'
import { Card } from 'rebass'
import { SubTitle, Text, ImageDefault } from '../../shared'
import { Flex } from 'rebass'
import { Paper } from '@material-ui/core'

export default ({ brand, name, price, images }) => {
  return (
    // TODO: description when grid changes

    <React.Fragment>
      <Card mx='auto' mt='-5px' p={2}>
        <Paper>
          <Flex justifyContent='center'>
            <ImageDefault images={images} name={name} />
          </Flex>
          <SubTitle textAlign='center' color='blue'>
            {brand.name}
          </SubTitle>
          <Text textAlign='center' fontWeight={600}>
            {name}
          </Text>
          <Text pb={[2, 3]} mb='0' textAlign='center' color='green'>
            $ {price}
          </Text>
        </Paper>
      </Card>
    </React.Fragment>
  )
}
