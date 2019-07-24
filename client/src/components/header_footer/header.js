import React, { useState } from 'react'
import { mq } from '../../globals'
import { Text } from 'rebass'
import Theme from '../../globals/theme'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/user/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { FaCartPlus, FaBars } from 'react-icons/fa'
import { Circle, Count } from '../shared'
import SideNav from './sidenav'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const Header = props => {
  const { dispatch } = props
  const [showNav, setShowNav] = useState(false)
  const opennav = () => setShowNav(true)
  const closenav = () => setShowNav(false)
  const logoutHandler = () => {
    dispatch(logout())
    props.history.push('/')
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
        <Button
          className={classes.btn}
          onClick={() => logoutHandler()}
          color='inherit'
          key={i}
        >
          <Text fontFamily='body' fontSize={[1, 2, 2]}>
            {item.name}
          </Text>
        </Button>
      )
    } else if (type) {
      let cartCount = props.user.userData.cart
      return (
        <React.Fragment key={i}>
          <IconButton
            edge='start'
            component={Link}
            to={item.linkTo}
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'
          >
            <FaCartPlus />
          </IconButton>
          <Circle>
            <Count>{cartCount.length > 0 ? cartCount.length : 0}</Count>
          </Circle>
        </React.Fragment>
      )
    } else {
      return (
        <Button
          className={classes.btn}
          component={Link}
          to={item.linkTo}
          color='inherit'
          key={i}
        >
          <Text fontFamily='body' fontSize={[1, 2, 2]}>
            {item.name}
          </Text>
        </Button>
      )
    }
  }

  const classes = useStyles()
  return (
    <React.Fragment>
      <SideNav
        showNav={showNav}
        onHideNav={() => closenav()}
        onOpenNav={() => opennav()}
        navStyle={{
          maxWidth: '220px'
        }}
        navItems={initialState}
      />
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.appBar}>
          <Container>
            <Toolbar>
              <Typography
                component={Link}
                to='/'
                variant='h5'
                className={classes.title}
              >
                <Text fontSize={[3, 4, 5]} ml='6'>
                  Shopper
                </Text>
              </Typography>
              <DesktopOnly>
                {showLinks(initialState.page)}
                {showLinks(initialState.user)}
              </DesktopOnly>
              <BarStyled onClick={opennav} />
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(Header))

const BarStyled = styled(FaBars)`
  display: block;
  ${mq[2]} {
    display: none;
  }
  color: #fff;
`
const DesktopOnly = styled.div`
  display: none;
  ${mq[2]} {
    display: block;
  }
`

const initialState = {
  page: [
    {
      name: 'Home',
      linkTo: '/',
      public: true
    },
    {
      name: 'Guitars',
      linkTo: '/shop',
      public: true
    }
  ],
  user: [
    {
      name: 'My Cart',
      linkTo: '/user/cart',
      public: false
    },
    {
      name: 'My Account',
      linkTo: '/user/dashboard',
      public: false
    },
    {
      name: 'Login',
      linkTo: '/register_login',
      public: true
    },
    {
      name: 'Logout',
      linkTo: '/user/logout',
      public: false
    }
  ]
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    // minHeight: '65px',
  },
  menuButton: {
    margin: '0 .5rem'
  },
  cartButton: {
    margin: '0 .5rem',
    position: 'relative'
  },
  title: {
    flexGrow: 1,
    color: '#fff',
    textDecoration: 'none'
  },
  btn: {
    fontFamily: Theme.fonts.body,
    margin: '0 .5rem'
  }
}))
