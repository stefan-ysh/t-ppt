/**
 * 简单的Jest配置测试
 */

describe('Jest配置测试', () => {
  test('Jest基础功能正常', () => {
    expect(1 + 1).toBe(2)
  })

  test('DOM环境可用', () => {
    document.body.innerHTML = '<div id="test">Hello World</div>'
    const element = document.getElementById('test')
    expect(element).toBeTruthy()
    expect(element.textContent).toBe('Hello World')
  })

  test('测试库匹配器可用', () => {
    const button = document.createElement('button')
    button.textContent = 'Click me'
    document.body.appendChild(button)

    expect(button).toBeInTheDocument()
  })
})
