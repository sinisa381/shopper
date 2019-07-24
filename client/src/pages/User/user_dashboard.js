import React from 'react'
import { Spacer } from '../../components/shared'
import UserLayout from '../../hoc/user_layout'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Title, Text, Paper } from '../../components/shared'

const UserDashboard = ({ user }) => {
  const classes = useStyles()
  return (
    <div>
      <Spacer pt={[3, 4, 5]} />
      <UserLayout>
        <Paper mb='15px'>
          <Title>User Information</Title>
          <Capitalize>
            <Text>{user.name}</Text>
            <Text>{user.lastname}</Text>
          </Capitalize>
          <Text>{user.email}</Text>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Edit Account Info
          </Button>
        </Paper>
        <Paper>
          <Title>History purchases</Title>
          <Text>history</Text>
        </Paper>
      </UserLayout>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}))
export default UserDashboard

const Capitalize = styled.div`
  text-transform: capitalize;
`
