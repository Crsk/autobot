import type { Meta, StoryObj } from '@storybook/react'
import { NavItem } from './NavItem'

const meta = {
  title: 'Molecules/NavItem',
  tags: ['autodocs'],
  component: NavItem,
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

export const NavItemLevelOpen1: Story = {
  args: {
    value: 'Startup',
    isGroup: true,
    isOpen: true,
    isPrivate: true,
    level: 1,
    theme: 'dark',
  },
}
