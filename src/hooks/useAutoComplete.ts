import { useState, useEffect, useCallback } from 'react'
import { Suggestion } from '../types'
import { mockData } from '../mockData'

const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const useAutoComplete = (query: string) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSuggestions = useCallback(
    debounce(async (q: string) => {
      if (q.length < 2) {
        setSuggestions([])
        return
      }

      setLoading(true)
      setError(null)

      try {
          const filteredSuggestions = mockData.filter((item) =>
          item.name.toLowerCase().includes(q.toLowerCase())
        )
        setSuggestions(filteredSuggestions)
      } catch (err) {
        setError('An error occurred while fetching suggestions')
      } finally {
        setLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    fetchSuggestions(query)
  }, [query, fetchSuggestions])

  return { suggestions, loading, error }
}

