import React, { FormEvent, useEffect, useState } from "react"
import { flashcardType } from "./type/type"
import { SampleFlashcards } from "./data/data"
import FlashcardList from "./FlashcardList"
import './app.css'
import { fetchQuestions } from "./api/api"
import { fetchCategories } from "./api/api"
import { categoryType } from "./type/type"
function App() {



const [flashcards,setFlashcards] = useState<flashcardType[]>(SampleFlashcards)
const [isLoading, setIsloading] = useState(true)

const [categories, setCategories] = useState<categoryType[]>([])

const [amount,setAmount] = useState(0)
const [selectedCategory, setSelectedCAtegory] = useState(0)
const handleAmountChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setAmount(parseInt(e.target.value))
}
const handleCatChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
  setSelectedCAtegory(parseInt(e.target.value))
}


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

useEffect(()=>{
  const getCategories=async()=>{
    const categories= await fetchCategories()
    setCategories(categories)
  }
  getCategories()
},[])
const handlesubmit = async (e:FormEvent)=>{
  e.preventDefault()
  const questions = await fetchQuestions(amount,selectedCategory)
  setFlashcards(questions)
}
  return (
    <>
    <form onSubmit={handlesubmit} className="header">
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select value={selectedCategory} onChange={handleCatChange}>
          {categories.map(categorie=>(
            <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
          ))}
        </select>
      </div>
     <div className="form-group">
        <label htmlFor="amount">Number of questions</label>
        <input type="number" min={1} step={1} defaultValue={10} value={amount} onChange={handleAmountChange}/>
     </div>
     <div className="form-group">
        <button type="submit" className="btn">Generate</button>
     </div>
    </form>
    <div className="container">
      {isLoading ? 'Loading...' : (
        <FlashcardList flashcards={flashcards}></FlashcardList>
      )}
    </div>
    </>
  )
}

export default App
