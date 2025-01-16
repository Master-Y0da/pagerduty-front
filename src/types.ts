export interface Suggestion {
    id: string
    name: string
    img?: string
  }
  
  export interface AutoCompleteProps {
    placeholder: string
    onSelect?: (suggestion: Suggestion) => void
  }
  
  