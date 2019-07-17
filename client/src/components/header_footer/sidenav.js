import React from 'react'
import SideNav from 'react-simple-sidenav'
import { Flex, Text } from 'rebass'
import { logout } from '../../actions/user_actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavItem, NavItemNoLink, Circle, Count } from '../shared'

const SideNavigation = props => {
	const logoutHandler = () => {
		props.dispatch(logout()).then(res => {
			props.history.push('/')
		})
	}
	const showLinks = type => {
		let list = []
		if (props.user.userData) {
			type.forEach(item => {
				if (!props.user.userData.isAuth) {
					if (item.public) {
						list.push(item)
					}
				} else {
					if (item.name !== 'Login') {
						list.push(item)
					}
				}
			})
		}
		return list.map((item, i) => {
			let isCart = false
			if (item.name === 'My Cart') {
				isCart = true
				return defaultLink(item, i, isCart)
			}
			return defaultLink(item, i)
		})
	}
	const defaultLink = (item, i, type) => {
		if (item.name === 'Logout') {
			return (
				<React.Fragment key={i}>
					<NavItemNoLink onClick={() => logoutHandler()}>
						<Text fontSize={[ 1, 2, 3 ]}>{item.name}</Text>
					</NavItemNoLink>
				</React.Fragment>
			)
		} else if (type) {
			let cartCount = props.user.userData.cart
			return (
				<NavItem to={item.linkTo} key={i}>
					<Flex alignItems='center'>
						<Text fontSize={[ 1, 2, 3 ]}>My Cart</Text>
						<Circle nav>
							<Count>
								{cartCount.length > 0 ? cartCount.length : 0}
							</Count>
						</Circle>
					</Flex>
				</NavItem>
			)
		} else {
			return (
				<NavItem to={item.linkTo} key={i}>
					<Text fontSize={[ 1, 2, 3 ]}>{item.name}</Text>
				</NavItem>
			)
		}
	}
	return (
		<div>
			<SideNav
				showNav={props.showNav}
				onHideNav={props.onHideNav}
				navStyle={{
					background: '#242424',
					maxWidth: '220px'
				}}
			>
				{showLinks(props.navItems.page)}
				{showLinks(props.navItems.user)}
			</SideNav>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}
export default connect(mapStateToProps)(withRouter(SideNavigation))
