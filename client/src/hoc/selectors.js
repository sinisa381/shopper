import { createSelector } from 'reselect'

const selectUser = state => state.user.userData

export const userSelector = createSelector(
  [selectUser],
  userdata => userdata
)
