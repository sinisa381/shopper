import React from 'react'
import Theme from '../../../globals/theme'
import { CardGrid } from '../../shared'
import { Flex } from 'rebass'
import Card from './card'
import { Button } from '@material-ui/core'
import { FaBriefcase } from 'react-icons/fa'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    flex: 1
  },
  input: {
    display: 'none'
  }
}))
const CardBlockShop = React.memo(props => {
  const classes = useStyles()
  const { list, grid } = props
  return (
    <React.Fragment>
      <CardGrid>
        {list
          ? list.map(item => {
              return (
                <Flex flexDirection='column' key={item._id}>
                  <Card key={item._id} {...item} />
                  <Flex alignItems='center' justifyContent='center'>
                    <Button
                      color='primary'
                      className={classes.button}
                      variant='outlined'
                    >
                      view
                    </Button>
                    <Button
                      style={{ padding: '8px 0' }}
                      variant='outlined'
                      className={classes.button}
                    >
                      <FaBriefcase size='25' color={Theme.colors.blacks[7]} />
                    </Button>
                  </Flex>
                </Flex>
              )
            })
          : null}
      </CardGrid>
    </React.Fragment>
  )
})

export default CardBlockShop
