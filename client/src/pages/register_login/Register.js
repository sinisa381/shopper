import React, { useState } from 'react'
import { Text } from '../../components/shared'
import FormField from '../../components/utils/form/form_field'
import { ErrorMsg } from '../../components/shared'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	update,
	generateData,
	isFormValid
} from '../../components/utils/form/form_actions'
import { userRegister } from '../../actions/user_actions'

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
		},
		confirmPassword: {
			element: 'input',
			value: '',
			config: {
				name: 'confirm_password_input',
				type: 'password',
				placeholder: 'confirm your password'
			},
			validation: {
				required: true,
				confirm: 'password'
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		name: {
			element: 'input',
			value: '',
			config: {
				name: 'name_input',
				type: 'text',
				placeholder: 'your name'
			},
			validation: {
				required: true
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		lastname: {
			element: 'input',
			value: '',
			config: {
				name: 'lastname_input',
				type: 'text',
				placeholder: 'your lastname'
			},
			validation: {
				required: true
			},
			valid: false,
			touched: false,
			validationMessage: ''
		}
	}
const Register = props => {
	const classes = useStyles()
	const [ formData, setFormData ] = useState(initialState)
	const [ formError, setFormError ] = useState(false)
	const [ formSuccess, setFormSuccess ] = useState('')

	const submitForm = e => {
		e.preventDefault()
		let dataToSubmit = generateData(formData, 'register')
		let formIsValid = isFormValid(formData, 'register')
		if (formIsValid) {
			props
				.dispatch(userRegister(dataToSubmit))
				.then(res => {
					if (res.payload.success) {
						setFormError(false)
						setFormSuccess('Congrats! You registered successfully!')
						setTimeout(() => {
							props.history.push('/register_login')
						}, 2000)
					} else {
						setFormError(true)
					}
				})
				.catch(err => setFormError(true))
		} else {
			setFormError(true)
		}
	}
	const updateForm = element => {
		const newFormData = update(element, formData, 'register')
		setFormData(newFormData)
		setFormError(false)
	}
	return (
		<div>
			<form onSubmit={submitForm}>
				<FormField
					id={'name'}
					formdata={formData.name}
					change={element => updateForm(element)}
				/>
				<FormField
					id={'lastname'}
					formdata={formData.lastname}
					change={element => updateForm(element)}
				/>
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
				<FormField
					id={'confirmPassword'}
					formdata={formData.confirmPassword}
					change={element => updateForm(element)}
				/>
				{formError && <ErrorMsg>Please check your data</ErrorMsg>}
				{<Text color='green'>{formSuccess}</Text>}
				<Button
					type='submit'
					variant='contained'
					onClick={submitForm}
					color='primary'
					className={classes.button}
				>
					Register
				</Button>
			</form>
		</div>
	)
}

export default connect()(withRouter(Register))
