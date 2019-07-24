import React from 'react'
import { mq } from '../../globals'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles'

export default function NProgress({ loading }) {
  const [completed, setCompleted] = React.useState(0)

  React.useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldCompleted + diff, 100)
      })
    }

    const timer = setInterval(progress, 500)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      {loading && <StyledProgress variant='determinate' value={completed} />}
    </div>
  )
}

const StyledProgress = styled(LinearProgress)`
  flex-grow: 1;
  position: absolute;
  top: 55px;
  ${mq[2]} {
    top: 63px;
  }
  left: 0px;
  right: 0px;
`
