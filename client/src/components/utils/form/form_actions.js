import produce from 'immer'

export const isFormValid = (formdata, type) => {
	let formIsValid = true
	for (let key in formdata) {
		formIsValid = formdata[key].valid && formIsValid
	}
	return formIsValid
}

export const generateData = (formdata, type) => {
	let dataToSubmit = {}
	for (let key in formdata) {
		if (key !== 'confirmPassword') {
			dataToSubmit[key] = formdata[key].value
		}
	}
	return dataToSubmit
}

const validate = (element, formdata = {}) => {
	let error = [ true, '' ]
	if (element.validation.email) {
		const valid = /\S+@\S+\.\S+/.test(element.value)
		const message = `${!valid ? 'Not valid email' : ''}`
		error = !valid ? [ valid, message ] : error
	}

	if (element.validation.confirm) {
		const valid =
			element.value === formdata[element.validation.confirm].value
		const message = `${!valid ? 'Password do not match' : ''}`
		error = !valid ? [ valid, message ] : error
	}

	if (element.validation.required) {
		// needs to be last one
		const valid = element.value.trim() !== ''
		const message = `${!valid ? 'This field is required' : ''}`
		error = !valid ? [ valid, message ] : error
	}

	return error
}
export const update = (element, formdata, type) => {
	const newFormData = produce(formdata, draft => {
		let newElement = draft[element.id]
		newElement.value = element.event.target.value
		let validData = validate(newElement, formdata)
		if (validData[0] === true) {
			newElement.valid = true
			newElement.validationMessage = validData[1]
		} else if (element.blur) {
			newElement.valid = validData[0]
			newElement.validationMessage = validData[1]
		}
		newElement.touched = element.blur
	})
	return newFormData
	// const newFormData = { ...formdata }
	// const newElement = { ...formdata[element.id] }
	// newElement.value = element.event.target.value
	// if (element.blur) {
	// 	let validData = validate(newElement, formdata)
	// 	newElement.valid = validData[0]
	// 	newElement.validationMessage = validData[1]
	// }
	// newElement.touched = element.blur
	// newFormData[element.id] = newElement
	// return newFormData
}
