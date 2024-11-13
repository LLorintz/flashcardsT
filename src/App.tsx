import { useEffect, useState } from "react"
import { flashcardType } from "./type/type"
import { SampleFlashcards } from "./data/data"
import FlashcardList from "./FlashcardList"
import './app.css'
import { fetchQuestions } from "./api/api"

function App() {



const [flashcards,setFlashcards] = useState<flashcardType[]>(SampleFlashcards)
const [isLoading, setIsloading] = useState(true)


useEffect(()=>{
  const getQuestions=async()=>{
    const questions = await fetchQuestions()
    if (questions.length>0) {
      setFlashcards(questions)
      setIsloading(false)
    }
  }
  getQuestions()
},[])

  return (
    <>
    <div className="header">
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select name="" id="">
          {}
        </select>
      </div>
     <div className="form-group">
        <label htmlFor="amount">Number of questions</label>
        <input type="number" min={1} step={1} defaultValue={10}/>
     </div>
     <div className="form-group">
        <button>Generate</button>
     </div>
    </div>
    <div className="container">
      {isLoading ? 'Loading...' : (
        <FlashcardList flashcards={flashcards}></FlashcardList>
      )}
    </div>
    </>
  )
}

export default App
