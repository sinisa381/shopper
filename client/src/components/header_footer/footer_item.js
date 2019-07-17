import React from 'react'
import { Flex, Box, Text } from 'rebass'

const Item = ({ awesome, title, desc }) => {
	return (
		<Flex alignItems='center' my={[ 2, 3, 3 ]}>
			{awesome}
			<Box ml='4'>
				<Text
					as='h3'
					m='0'
					py='1'
					fontFamily='forum'
					color='whites.5'
					fontSize={[ 2, 3, 3 ]}
				>
					{title}
				</Text>
				<Text
					py='1'
					as='h3'
					m='0'
					fontFamily='forum'
					color='whites.5'
					fontSize={[ 2, 3, 3 ]}
				>
					{desc}
				</Text>
			</Box>
		</Flex>
	)
}

export default Item
