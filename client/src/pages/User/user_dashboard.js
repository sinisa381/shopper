import React from 'react'
import UserLayout from '../../hoc/user_layout'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Title, Text, Paper } from '../../components/shared'

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	},
	input: {
		display: 'none'
	}
}))
const UserDashboard = ({ user }) => {
	const classes = useStyles()
	return (
		<div>
			<UserLayout>
				<Paper mb='15px'>
					<Title>User Information</Title>
					<Capitalize>
						<Text>{user.userData.name}</Text>
						<Text>{user.userData.lastname}</Text>
					</Capitalize>
					<Text>{user.userData.email}</Text>
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

export default UserDashboard

const Capitalize = styled.div`text-transform: capitalize;`
