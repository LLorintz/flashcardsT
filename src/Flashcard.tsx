import React, { useState } from 'react'
import { flashcardType } from './type/type'


type flashcardProps={
    flashcard:flashcardType;
}

const Flashcard = ({flashcard}:flashcardProps) => {

const [flip, setFlip] = useState(false)

return (
    <div onClick={()=>setFlip(!flip)} className={`card ${flip?'flip':''}`}>
        <div className='front'>
            {flashcard.question}
        </div>
        <div className='back'>
            {flashcard.answer}
        </div>
    </div>
  )
}

export default Flashcard