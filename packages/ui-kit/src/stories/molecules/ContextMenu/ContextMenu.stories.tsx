import type { Meta, StoryObj } from '@storybook/react'
import { ContextMenu } from './ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Molecules/ContextMenu',
  tags: ['autodocs'],
  component: ContextMenu,
}

export default meta

type Story = StoryObj<typeof meta>

export const ContextMenuItemDark: Story = {
  args: {
    options: [
      { type: 'button', label: 'New node', isDisabled: false, onClick: () => {}, onContextMenu: () => {} },
      { type: 'separator' },
      {
        type: 'button',
        label: 'New folder',
        isDisabled: false,
        onClick: () => {},
        onContextMenu: () => {},
      },
      { type: 'button', label: 'Duplicate', isDisabled: false, onClick: () => {}, onContextMenu: () => {} },
      { type: 'button', label: 'Rename', isDisabled: false, onClick: () => {}, onContextMenu: () => {} },
      { type: 'button', label: 'Move to...', isDisabled: true, onClick: () => {}, onContextMenu: () => {} },
      { type: 'separator' },
      { type: 'button', label: 'Delete', isDisabled: false, onClick: () => {}, onContextMenu: () => {} },
    ],
  },
}
