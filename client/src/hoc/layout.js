import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/header_footer/header'
import Footer from '../components/header_footer/footer'
import { Container } from '../components/shared'
import { Flex, Box } from 'rebass'
import styled from 'styled-components'
import NProgress from '../components/utils/nprogress'
import { connect } from 'react-redux'
import { ProviderHook } from '../context'

const Layout = props => {
	const [ loading, setLoading ] = useState(true)
	return (
		<React.Fragment>
			<ProviderHook value={{ loading, setLoading }}>
				<Flex flexDirection='column'>
					<Header setLoading={setLoading} />
					<NProgress loading={loading} />
					<Body mb='auto'>
						<Container>{props.children}</Container>
					</Body>
					<Footer />
				</Flex>
			</ProviderHook>
		</React.Fragment>
	)
}

export default connect()(Layout)

const Body = styled(Box)`
min-height:87vh;
`
