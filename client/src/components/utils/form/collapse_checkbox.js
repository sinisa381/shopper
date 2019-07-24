import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { makeStyles } from '@material-ui/core/styles'
import { Title, SubTitle, Text, Spacer } from '../../shared'

import Checkbox from '@material-ui/core/Checkbox'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(3)
  }
}))

const CollapseCheckbox = ({ title, formdata, init, updateFilters }) => {
  const [open, setOpen] = React.useState(false)
  const [checked, setChecked] = React.useState([])
  const classes = useStyles()

  const handleToggle = value => () => {
    const newChecked = [...checked]
    const currentIndex = newChecked.indexOf(value)
    if (currentIndex === -1) {
      newChecked.push(value)
      setChecked(newChecked)
    } else {
      newChecked.splice(currentIndex, 1)
      setChecked(newChecked)
    }
  }

  useEffect(() => {
    updateFilters(checked)
  }, [checked])

  useEffect(() => {
    setOpen(init)
  }, [init])
  const renderCheckboxes = () =>
    formdata.map(item => (
      <ListItem key={item._id} className={classes.nested}>
        <ListItemText
          primary={
            <Text m='0' fontSize={[1, 2]} fontFamily='body'>
              {item.name}
            </Text>
          }
        />
        <ListItemSecondaryAction>
          <Checkbox
            edge='end'
            checked={checked.find(id => id === item._id)}
            onChange={handleToggle(item._id)}
            value={item.name}
            inputProps={{
              'aria-label': 'primary checkbox'
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ))
  return (
    <React.Fragment>
      <ListItem button onClick={() => setOpen(prev => !prev)}>
        <ListItemText
          primary={
            <SubTitle fontFamily='roboto' fontSize={[2, 2, 2]} m='0'>
              {title}
            </SubTitle>
          }
        />
        {open ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {renderCheckboxes()}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default CollapseCheckbox
