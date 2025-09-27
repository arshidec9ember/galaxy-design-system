import * as components from './components'
import create from './create'

const gdsComponents = create({
  components: Object.keys(components).map(
    (key) => components[key as keyof typeof components]
  )
})

export default gdsComponents
export const install = gdsComponents.install
