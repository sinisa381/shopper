import React from 'react'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { Flex, Text } from 'rebass'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { MdChevronLeft, MdChevronRight, MdClose } from 'react-icons/md'

const drawerWidth = 240

const DrawerComponent = props => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <MdClose />
          </IconButton>
        </div>
        <StyledSimpleBar>{props.render(handleDrawerClose)}</StyledSimpleBar>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes}>
          <Flex alignItems='center' ml={3}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MdChevronRight />
            </IconButton>
          </Flex>
          <Flex alignItems='center' ml={3}>
            <IconButton
              color='inherit'
              aria-label='Close drawer'
              onClick={handleDrawerClose}
              edge='start'
              className={clsx(classes.menuButton, !open && classes.hide)}
            >
              <MdChevronLeft />
            </IconButton>
          </Flex>
        </div>
        {props.children}
      </main>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    marginTop: '15vh',
    height: '70vh',
    width: drawerWidth
    // marginTop: 73
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))
export default DrawerComponent

const StyledSimpleBar = styled(SimpleBar)`
  height: 80%;
`
