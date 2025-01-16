import React, {useState} from 'react'
import { AutoComplete } from './components/AutoComplete'
import { Suggestion } from './types'
import './App.css'

function App() {

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const displayImage = (suggestion: Suggestion) => {
    const img = new Image()
    img.src = "img/" + suggestion.img
    img.onload = () => {
      setSelectedImage(img.src)
    }
  }

  const handleSelect = (suggestion: Suggestion) => {
    setSelectedImage(null)
    displayImage(suggestion)
  }

  return (
    <div className="App">
      {selectedImage ? 
      <div className="image-container">
        <img 
          src={selectedImage}
          alt="Star Wars Character" 
          className="character-image"
          loading="lazy"
          aria-label="Selected Star Wars character portrait"
        />
      </div>
      : <></>}
      <h1 className='star-wars-title'>Star Wars Character search!</h1>
      <AutoComplete placeholder="Search..." onSelect={handleSelect} />
    </div>
  )
}

export default App

