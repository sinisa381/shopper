import React from 'react'
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

const CollapseCheckbox = ({ change, title, formdata, init }) => {
	const [ open, setOpen ] = React.useState(init)
	const classes = useStyles()

	const SingleList = ({ name, checked, _id }) => (
		<ListItem className={classes.nested}>
			<ListItemText
				primary={
					<Text m='0' fontFamily='body'>
						{name}
					</Text>
				}
			/>
			<ListItemSecondaryAction>
				<Checkbox
					edge='end'
					checked={checked}
					onChange={event => change({ event, _id })}
					value={name}
					inputProps={{
						'aria-label': 'primary checkbox'
					}}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	)
	return (
		<React.Fragment>
			<ListItem button onClick={() => setOpen(!open)}>
				<ListItemText
					primary={
						<SubTitle
							fontFamily='roboto'
							fontSize={[ 3, 3, 2 ]}
							m='0'
						>
							{title}
						</SubTitle>
					}
				/>
				{open ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
			</ListItem>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					{formdata.map(item => (
						<SingleList key={item._id} {...item} change={change} />
					))}
				</List>
			</Collapse>
		</React.Fragment>
	)
}

export default CollapseCheckbox
