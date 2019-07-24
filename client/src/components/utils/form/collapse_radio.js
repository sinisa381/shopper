import React, { useState, useEffect } from 'react'
import { Text } from '../../shared'
import { makeStyles } from '@material-ui/core/styles'
import { SubTitle } from '../../shared'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(2)
  }
}))

const CollapseRadio = ({ updateFilters, title, formdata, init }) => {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState('0')

  const handleChange = e => {
    setChecked(e.target.value)
  }

  useEffect(() => {
    setOpen(init)
  }, [])
  useEffect(() => {
    updateFilters(checked)
  }, [checked])

  const classes = useStyles()
  const renderRadio = () =>
    formdata.map(item => (
      <FormControlLabel
        className={classes.nested}
        key={item._id}
        value={item._id + ''}
        label={
          <Text m='0' fontSize={[1, 2]} fontFamily='body'>
            {item.name}
          </Text>
        }
        control={<Radio />}
      />
    ))

  return (
    <React.Fragment>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText
          primary={
            <SubTitle fontFamily='roboto' fontSize={[3, 3, 2]} m='0'>
              {title}
            </SubTitle>
          }
        />
        {open ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <RadioGroup
          name='prices'
          aria-label='prices'
          value={checked}
          onChange={handleChange}
        >
          {renderRadio()}
        </RadioGroup>
      </Collapse>
    </React.Fragment>
  )
}

export default CollapseRadio
