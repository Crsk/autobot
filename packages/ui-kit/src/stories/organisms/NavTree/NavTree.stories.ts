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
        isGroup: true,
        level: 0,
        children: [
          {
            value: 'Y Combinator',
            isGroup: true,
            level: 1,
            children: [
              {
                value: 'Startup School',
                isGroup: true,
                level: 2,
                children: [
                  { value: 'Pricing', isGroup: false, level: 3, children: [] },
                  { value: 'Things to avoid', isGroup: false, level: 3, children: [] },
                  { value: 'Co-founder', isGroup: false, level: 3, children: [] },
                ],
              },
              { value: 'Paul Graham', isGroup: true, level: 2, children: [] },
            ],
          },
          { value: 'Ideas', isGroup: true, level: 1, isPrivate: true, children: [] },
        ],
      },
    ],
  },
}
