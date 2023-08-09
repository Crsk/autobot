import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  tags: ['autodocs'],
  component: Text,
}

export default meta

type Story = StoryObj<typeof meta>

export const TexXXLTitleLightBold: Story = {
  args: {
    size: 'xxl',
    level: 'title',
    style: 'bold',
    theme: 'light',
    color: 'base',
    children: 'Lorem Ipsum dolor',
  },
}

export const TexLPrimaryLightBold: Story = {
  args: {
    size: 'l',
    level: 'primary',
    style: 'bold',
    theme: 'light',
    color: 'base',
    children: 'Lorem Ipsum dolor',
  },
}

export const TexHeader1SecondaryLightStrikethrough: Story = {
  args: {
    size: 'h1',
    level: 'secondary',
    style: 'strikethrough',
    theme: 'light',
    color: 'base',
    children: 'Lorem Ipsum dolor',
  },
}

export const TexBodyBiggerTertiaryLightSemiBold: Story = {
  args: {
    size: 'body-bigger',
    level: 'tertiary',
    style: 'semi-bold',
    theme: 'light',
    color: 'base',
    children: 'Lorem Ipsum dolor',
  },
}

export const TexBodyDisabledLightRegular: Story = {
  args: {
    size: 'body',
    level: 'disabled',
    style: 'regular',
    theme: 'light',
    color: 'base',
    children: 'Lorem Ipsum dolor',
  },
}

export const TexSmallTitleLightRegular: Story = {
  args: {
    size: 's',
    level: 'title',
    style: 'regular',
    theme: 'light',
    color: 'base',
    children: 'Lorem Ipsum dolor',
  },
}
