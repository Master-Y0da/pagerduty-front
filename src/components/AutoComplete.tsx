import React, { useState, useRef, useCallback } from 'react'
import { AutoCompleteProps, Suggestion } from '../types'
import { useAutoComplete } from '../hooks/useAutoComplete'
import { HighlightText } from './HighlightText'
import { VirtualList } from './VirtualList'
import '../styles/AutoComplete.css'

export const AutoComplete: React.FC<AutoCompleteProps> = ({ placeholder, onSelect }) => {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { suggestions, loading, error } = useAutoComplete(inputValue)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setIsOpen(true)
  }

  const handleSelectSuggestion = useCallback((suggestion: Suggestion) => {
    setInputValue(suggestion.name)
    setIsOpen(false)
    if (onSelect && typeof onSelect === 'function') {
      onSelect(suggestion)
    }
  }, [onSelect])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="auto-complete-container">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="auto-complete-input"
      />
      {isOpen && (
        <div className="auto-complete-dropdown">
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && suggestions.length === 0 && (
            <div className="no-results">No results found</div>
          )}
          {!loading && !error && suggestions.length > 0 && (
            <VirtualList
              items={suggestions}
              itemHeight={40}
              height={300}
              renderItem={(suggestion) => (
                <div
                  key={suggestion.id}
                  className="suggestion-item"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <HighlightText text={suggestion.name} highlight={inputValue} />
                </div>
              )}
            />
          )}
        </div>
      )}
    </div>
  )
}

