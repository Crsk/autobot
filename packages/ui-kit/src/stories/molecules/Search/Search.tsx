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
  const handleKeyDown = () => onSearch(searchValue)

  return (
    <div className={`${styles.search} ${styles[`search--${theme}`]}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className={`${styles['search--input']} ${styles[`search--input--${theme}`]}`}
      />
    </div>
  )
}

export { Search }
