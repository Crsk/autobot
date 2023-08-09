import type { Meta, StoryObj } from '@storybook/react'
import { ContextMenuItem } from './ContextMenuItem'

const meta: Meta<typeof ContextMenuItem> = {
  title: 'Molecules/ContextMenuItem',
  tags: ['autodocs'],
  component: ContextMenuItem,
}

export default meta

type Story = StoryObj<typeof meta>

export const ContextMenuItemNormal: Story = {
  args: {
    value: 'Open in new tab',
    onClick: () => {},
  },
}
