import React from 'react'
import { Link } from 'react-router-dom'
import { Text, Title } from '../../components/shared'
import Login from './Login'
import Container from '@material-ui/core/Container'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1)
	},
	input: {
		display: 'none'
	}
}))
const RegisterLogin = props => {
	const classes = useStyles()
	return (
		<Container>
			<Title>New customers</Title>
			<Text>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
				doloremque, cupiditate, ducimus saepe obcaecati facere aliquid,
				sunt adipisci officiis tempora labore pariatur nam porro minus.
			</Text>
			{/* <BtnDefault linkTo='/register'>Register</BtnDefault> */}
			<Button
				component={Link}
				to='/register'
				variant='contained'
				color='primary'
				size='large'
				className={classes.button}
			>
				register
			</Button>
			<Title>If you have account</Title>
			<Text>Please login</Text>
			<Login />
		</Container>
	)
}

export default RegisterLogin
