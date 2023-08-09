import React, { useState } from 'react'
import styles from './Search.module.scss'

type SearchProps = {
  placeholder: string
  onSearch: (searchValue: string) => void
  theme?: 'light' | 'dark'
  value?: string
}

const Search = ({ placeholder, onSearch, theme = 'dark', value = '' }: SearchProps) => {
  const [searchValue, setSearchValue] = useState(null || value)

  const searchChange = (search: string) => {
    setSearchValue(search)
    onSearch(search)
  }

  return (
    <div className={`${styles.search} ${styles[`search--${theme}`]}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={event => searchChange(event.target.value)}
        className={`${styles['search--input']} ${styles[`search--input--${theme}`]}`}
      />
    </div>
  )
}

export { Search }
