import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Search } from './Search'

vi.mock('../Icon/Icon', () => ({
  Icon: ({ type }: never) => <div data-testid={`icon-${type}`} />,
}))

describe('<Search />', () => {
  let onSearchMock: any
  let input: any

  beforeEach(() => {
    onSearchMock = vi.fn()
    const renderResult = render(<Search placeholder="asd" onSearch={onSearchMock} />)
    const { getByPlaceholderText } = renderResult
    input = getByPlaceholderText('asd')
  })

  it('allows input of text', () => {
    fireEvent.change(input, { target: { value: 'asd' } })
    expect(input.value).toBe('asd')
  })

  it('applies dark theme', () => {
    const { container: darkContainer, getByPlaceholderText } = render(
      <Search placeholder="asd dark" onSearch={onSearchMock} theme="dark" />
    )
    const darkInput = getByPlaceholderText('asd dark')

    expect(darkContainer.firstChild).toHaveClass('search--dark')
    expect(darkInput).toHaveClass('search--input--dark')
  })

  it('applies light theme', () => {
    const { container: lightContainer, getByPlaceholderText } = render(
      <Search placeholder="asd light" onSearch={onSearchMock} theme="light" />
    )
    const lightInput = getByPlaceholderText('asd light')

    expect(lightContainer.firstChild).toHaveClass('search--light')
    expect(lightInput).toHaveClass('search--input--light')
  })

  it('applies the initial value when value prop is provided', () => {
    const { getByDisplayValue } = render(<Search placeholder="Search" onSearch={onSearchMock} value="predefined" />)
    const inputWithValue = getByDisplayValue('predefined') as HTMLInputElement

    expect(inputWithValue.value).toBe('predefined')
  })
})
