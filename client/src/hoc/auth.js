import React, { useEffect, useContext } from 'react'
import { userSelector } from './selectors'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { auth } from '../redux/user/actions'
import { LoadingContext } from '../context/loading-header'

export default function(ComposedComponent, reload, adminRoute = null) {
  const Auth = props => {
    const { setLoading, loading } = useContext(LoadingContext)
    useEffect(() => {
      const userData = async () => {
        try {
          props.dispatch(auth()).then(response => {
            setLoading(false)
            if (!response.payload.isAuth) {
              if (reload) {
                props.history.push('/register_login')
              }
            } else {
              if (adminRoute && !response.payload.isAdmin) {
                props.history.push('/user/dashboard')
              } else {
                if (reload === false) {
                  props.history.push('/user/dashboard')
                }
              }
            }
          })
        } catch (e) {
          setLoading(false)
          throw e
        }
      }
      userData()
    }, [])

    if (loading) return null

    return <ComposedComponent {...props} user={props.user} />
  }

  const mapStateToProps = createStructuredSelector({
    user: userSelector
  })

  return connect(mapStateToProps)(Auth)
}
