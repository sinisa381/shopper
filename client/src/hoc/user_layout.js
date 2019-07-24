import React from 'react'
import { Box, Flex } from 'rebass'
import { mq } from '../globals'
import { Text } from 'rebass'
import { Link } from '../components/shared'

import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
const UserLayout = props => {
  const showLinks = () =>
    links.map((item, i) => (
      <React.Fragment key={i}>
        <ListItem button component={Link} to={item.linkTo}>
          <ListItemText>
            <Text fontSize={[1, 2, 3]}>{item.name}</Text>
          </ListItemText>
        </ListItem>
        <Divider />
      </React.Fragment>
    ))

  return (
    <React.Fragment>
      <Body>
        <Container>
          <Flex flexWrap='wrap' justifyContent='center' mt='3'>
            <Left>
              <Paper>{showLinks()}</Paper>
            </Left>
            <Right pl={[0, 4]} pt={[4, 0]}>
              {props.children}
            </Right>
          </Flex>
        </Container>
      </Body>
    </React.Fragment>
  )
}

const links = [
  {
    name: 'My account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'User information',
    linkTo: '/user/user_profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
]
export default UserLayout

const Body = styled(Box)`
  min-height: 87vh;
`
const Left = styled(Box)`
  flex: 100%;
  ${mq[1]} {
    flex: 20%;
  }
`
const Right = styled(Box)`
  flex: 100%;
  ${mq[1]} {
    flex: 80%;
  }
`
