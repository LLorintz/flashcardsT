import Flashcard from "./Flashcard"
import { flashcardType } from "./type/type"

type flashcardlistProps = {
    flashcards:flashcardType[]
}

const FlashcardList = ({flashcards}:flashcardlistProps) => {
  return (
    <div className='card-grid'>
        {flashcards.map(flashcard=>(
            <Flashcard  flashcard={flashcard}></Flashcard>
        ))}
    </div>
  )
}

export default FlashcardList