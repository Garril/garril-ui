import { upperFirstLetter } from '../utils'

export default function genTestTemplate(name) {
  return `\
import { render } from '@testing-library/vue'
import ${upperFirstLetter(name)} from '../src/${name}'

describe('${name} test', () => {
  test('${name} init render', async () => {
    const { getByRole } = render(${upperFirstLetter(name)})
    getByRole('${name}')
  })
})
`
}
