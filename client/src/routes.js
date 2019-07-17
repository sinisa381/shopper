import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from './hoc/layout'
import Auth from './hoc/auth'
//public
import Home from './pages/home'

import RegisterLogin from './pages/register_login'
import Register from './pages/register_login/Register'
import Shop from './pages/shop'

//private
import UserDashboard from './pages/User/user_dashboard'

function Routes() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Layout>
				<Switch>
					<Route
						path='/user/dashboard'
						component={Auth(UserDashboard, true)}
					/>
					<Route
						path='/register_login'
						component={Auth(RegisterLogin, false)}
					/>
					<Route path='/register' component={Auth(Register, false)} />
					<Route path='/shop' component={Auth(Shop, null)} />
					<Route path='/' exact component={Auth(Home, null)} />
				</Switch>
			</Layout>
		</React.Fragment>
	)
}

export default Routes
