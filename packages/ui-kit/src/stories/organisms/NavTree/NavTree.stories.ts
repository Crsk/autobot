import type { Meta, StoryObj } from '@storybook/react'
import { NavTree } from './NavTree'

const meta = {
  title: 'Organisms/NavTree',
  tags: ['autodocs'],
  component: NavTree,
} satisfies Meta<typeof NavTree>

export default meta
type Story = StoryObj<typeof meta>

export const NavTreeDark: Story = {
  args: {
    theme: 'dark',
    tree: [
      {
        value: 'Startup',
        isFolder: true,
        level: 0,
        children: [
          {
            value: 'Y Combinator',
            isFolder: true,
            level: 1,
            children: [
              {
                value: 'Startup School',
                isFolder: true,
                level: 2,
                children: [
                  { value: 'Pricing', isFolder: false, level: 3, children: [] },
                  { value: 'Things to avoid', isFolder: false, level: 3, children: [] },
                  { value: 'Co-founder', isFolder: false, level: 3, children: [] },
                ],
              },
              {
                value: 'Paul Graham',
                isFolder: true,
                level: 2,
                children: [{ value: 'How to get startup ideas', isFolder: false, level: 4, children: [] }],
              },
              {
                value: 'Sam Altman',
                isFolder: true,
                level: 2,
                children: [{ value: 'How to be successful', isFolder: false, level: 4, children: [] }],
              },
            ],
          },
          { value: 'My ideas', isFolder: true, level: 1, isPrivate: true, children: [] },
        ],
      },
    ],
  },
}
