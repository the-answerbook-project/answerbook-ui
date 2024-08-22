import { useEffect, useState } from 'react'

// Default to 500ms debouncing delay
const DEFAULT_DELAY = 500

const useDebounce = (value: string | undefined, delay: number = DEFAULT_DELAY) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
