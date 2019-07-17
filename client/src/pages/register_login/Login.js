import React, { useState } from 'react'
import FormField from '../../components/utils/form/form_field'
import { ErrorMsg } from '../../components/shared'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	update,
	generateData,
	isFormValid
} from '../../components/utils/form/form_actions'
import { loginUser } from '../../actions/user_actions'
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

const initialState = {
	email: {
		element: 'input',
		value: '',
		config: {
			name: 'email_input',
			type: 'email',
			placeholder: 'enteremail@gmail.com'
		},
		validation: {
			required: true,
			email: true
		},
		valid: false,
		touched: false,
		validationMessage: ''
	},
	password: {
		element: 'input',
		value: '',
		config: {
			name: 'password_input',
			type: 'password',
			placeholder: 'your password'
		},
		validation: {
			required: true
		},
		valid: false,
		touched: false,
		validationMessage: ''
	}
}
const Login = props => {
	const classes = useStyles()

	const [ formData, setFormData ] = useState(initialState)
	const [ formError, setFormError ] = useState(false)

	const submitForm = e => {
		e.preventDefault()
		let dataToSubmit = generateData(formData, 'login')
		let formIsValid = isFormValid(formData, 'login')
		if (formIsValid) {
			props.dispatch(loginUser(dataToSubmit)).then(res => {
				if (res.payload.loginSuccess) {
					props.history.push('/user/dashboard')
				} else {
					setFormError(true)
				}
			})
		} else {
			setFormError(true)
		}
	}
	const updateForm = element => {
		const newFormData = update(element, formData, 'login')
		setFormData(newFormData)
		setFormError(false)
	}
	return (
		<div>
			<form onSubmit={submitForm}>
				<FormField
					id={'email'}
					formdata={formData.email}
					change={element => updateForm(element)}
				/>
				<FormField
					id={'password'}
					formdata={formData.password}
					change={element => updateForm(element)}
				/>

				{formError && <ErrorMsg>Please check your data</ErrorMsg>}
				<Button
					type='submit'
					onClick={submitForm}
					variant='contained'
					color='secondary'
					size='large'
					className={classes.button}
				>
					login
				</Button>
			</form>
		</div>
	)
}

export default connect()(withRouter(Login))
