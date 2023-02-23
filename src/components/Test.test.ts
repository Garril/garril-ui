import Test from './Test'
import { render } from '@testing-library/vue'

test('Test.tsx should work', () => {
  // expect(true).toBe(true)
  const { getByText } = render(Test)
  // 断言输出结果
  getByText('test: 0') // 匹配的test: 0 必须按照格式
})
