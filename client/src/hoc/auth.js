import React, { useEffect, useContext } from 'react'
// import { Flex } from 'rebass'
import { connect } from 'react-redux'
import { auth } from '../actions/user_actions'
// import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { LoadingContext } from '../context'

const useStyles = makeStyles(theme => ({
	progress: {
		margin: 20
	}
}))

export default function(ComposedComponent, reload, adminRoute = null) {
	const Auth = props => {
		// const classes = useStyles()
		const { setLoading, loading } = useContext(LoadingContext)

		useEffect(() => {
			props.dispatch(auth()).then(res => {
				setLoading(false)
				if (!res.payload.isAuth) {
					if (reload) {
						props.history.push('/register_login')
					}
				} else {
					if (adminRoute && !res.payload.isAdmin) {
						props.history.push('/user/dashboard')
					} else {
						if (reload === false) {
							props.history.push('/user/dashboard')
						}
					}
				}

				setLoading(false)
			})
		}, [])

		if (loading) {
			return null
			// (
			// 	<Flex justifyContent='center' alignItems='center' mt='10%'>
			// 		<CircularProgress
			// 			className={classes.progress}
			// 			color='primary'
			// 			size={60}
			// 		/>
			// 	</Flex>
			// )
		}
		return <ComposedComponent {...props} user={props.user} />
	}

	function mapStateToProps(state) {
		return {
			user: state.user
		}
	}

	return connect(mapStateToProps)(Auth)
}
