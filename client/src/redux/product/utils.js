import { produce } from 'immer'
export function computeState(data) {
  const newData = produce(data, draft => {
    draft.forEach(item => (item.checked = false))
  })
  return newData
}
