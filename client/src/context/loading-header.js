import React from 'react'

const LoadingContext = React.createContext()

const { Provider } = LoadingContext

export { Provider as ProviderHook, LoadingContext }
