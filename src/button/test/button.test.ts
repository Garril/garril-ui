import { render } from '@testing-library/vue'
import Button from '../src/button'

// base button
test('test base button,without anything passed', () => {
  const { getByRole } = render(Button)
  getByRole('button')
})
// type
// button type defalut should be secondary
test('test button default type', () => {
  const { getByRole } = render(Button)
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--secondary')).toBe(true)
})
// test button pass props type
test('test button pass props type', () => {
  const { getByRole } = render(Button, {
    props: {
      type: 'primary'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--primary')).toBe(true)
})

// slot
// slot default should be right
test('test slot default should be right', () => {
  const { getByText } = render(Button)
  getByText('按钮')
})
// slot should work
test('slot should work', () => {
  const { getByText } = render(Button, {
    slots: {
      default() {
        return 'inslot'
      }
    }
  })
  getByText('inslot')
})
