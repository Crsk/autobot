import type { Meta, StoryObj } from '@storybook/react'
import { Search } from './Search'

const meta = {
  title: 'Molecules/Search',
  tags: ['autodocs'],
  component: Search,
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const SearchDark: Story = {
  args: {
    placeholder: 'Search',
    onSearch: (searchValue: string) => console.log(searchValue),
    theme: 'dark',
  },
}

export const SearchDarkValue: Story = {
  args: {
    placeholder: 'Search',
    onSearch: (searchValue: string) => console.log(searchValue),
    theme: 'dark',
    value: 'Search value',
  },
}

export const SearchLight: Story = {
  args: {
    placeholder: 'Search',
    onSearch: (searchValue: string) => console.log(searchValue),
    theme: 'light',
  },
}

export const SearchLightValue: Story = {
  args: {
    placeholder: 'Search',
    onSearch: (searchValue: string) => console.log(searchValue),
    theme: 'light',
    value: 'Search value',
  },
}
