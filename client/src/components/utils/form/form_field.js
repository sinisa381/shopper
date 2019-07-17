import React from 'react'
import { ErrorMsg } from '../../shared'
import TextField from '@material-ui/core/TextField'
const FormField = ({ formdata, change, id }) => {
	const showError = () => {
		let errorMessage = ''
		if (formdata.validation && !formdata.valid) {
			errorMessage = <ErrorMsg>{formdata.validationMessage}</ErrorMsg>
		}
		return errorMessage
	}

	const renderTemplate = () => {
		let template = null
		switch (formdata.element) {
			case 'input':
				template = (
					<React.Fragment>
						<TextField
							error={!formdata.valid && formdata.touched}
							label={id}
							id={id}
							margin='normal'
							variant='outlined'
							{...formdata.config}
							value={formdata.value}
							onBlur={event => change({ event, id, blur: true })}
							onChange={event => change({ event, id })}
						/>
						{showError()}
					</React.Fragment>
				)
				break
			default:
				return template
		}
		return template
	}

	return <div>{renderTemplate()}</div>
}

export default FormField
