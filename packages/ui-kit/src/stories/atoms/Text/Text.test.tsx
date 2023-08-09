import React from 'react'
import { render, screen } from '@testing-library/react'
import { Text } from './Text'

describe('Text', () => {
  it('renders without crashing', () => {
    render(
      <Text level="tertiary" size="xs" style="strikethrough" theme="light">
        Batman
      </Text>
    )
    expect(screen.getByText('Batman')).toBeInTheDocument()
  })

  it('renders custom child', () => {
    render(
      <Text>
        <span>Batman</span>
      </Text>
    )
    expect(screen.getByText('Batman')).toBeInTheDocument()
  })

  test.each`
    level          | size         | style              | theme        | color        | expectedClassName
    ${'secondary'} | ${'xl'}      | ${'bold'}          | ${'dark'}    | ${'blue'}    | ${'text text--xl   bold          text--blue--dark--secondary'}
    ${'title'}     | ${'xxl'}     | ${'semi-bold'}     | ${'light'}   | ${'green'}   | ${'text text--xxl  semi-bold     text--green--light--title'}
    ${'primary'}   | ${'body'}    | ${'italic'}        | ${'dark'}    | ${'yellow'}  | ${'text text--body italic        text--yellow--dark--primary'}
    ${'tertiary'}  | ${'s'}       | ${'strikethrough'} | ${'light'}   | ${'red'}     | ${'text text--s    strikethrough text--red--light--tertiary'}
    ${'tertiary'}  | ${'s'}       | ${'strikethrough'} | ${'light'}   | ${undefined} | ${'text text--s    strikethrough text--base--light--tertiary'}
    ${undefined}   | ${undefined} | ${undefined}       | ${undefined} | ${undefined} | ${'text text--body regular       text--base--dark--primary'}
  `(
    'applies the correct styles based on props: level=$level, size=$size, style=$style, theme=$theme, color=$color',
    ({ level, size, style, theme, color, expectedClassName }) => {
      render(
        <Text level={level} size={size} style={style} theme={theme} color={color}>
          Test
        </Text>
      )

      const text = screen.getByText('Test')
      expect(text).toHaveClass(expectedClassName)
    }
  )
})
