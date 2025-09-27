import { cB, cM, cNotM } from '../../../_utils/cssr/index'

export default cB('button-overflow', `
  display: flex;
  flex-wrap: nowrap;
  display: inline-flex;
  position: relative;
  gap: 8px;
`, [
  cNotM('vertical', {
    flexDirection: 'row'
  }),
  cM('vertical', {
    flexDirection: 'column'
  })
])
