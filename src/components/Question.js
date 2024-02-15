import React from 'react'
import { useState } from 'react';



export default function Question({question, changeQuestion}) {
  const [classToApply, setClassToApply] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState(-1)
  const [answering, setAnswering] = useState(false);

  const checkAnswer = (question, selectedAnswer) => {
    if(answering) return;
    setAnswering(true);
    setSelectedAnswer(selectedAnswer)


    const classToApply = selectedAnswer === question.answer ? 'correct' : 'incorrect';
    setClassToApply(classToApply)
    const bonus = selectedAnswer === question.answer ? 10 : 0


    setTimeout( () => {
      setSelectedAnswer(-1)
      setAnswering(false)
      changeQuestion()
    }, 1000)

  }

  //I can't help but wonder if we couldnt map this instead?
  return(
    <div>
      {/* dangerouslySetInnerHTML is a way to format better so you don't get the % and stuff in the h2
      we are set it to an object where the html property is the choice */}
      <h2 dangerouslySetInnerHTML={{__html: question.question}}></h2>
      {/* <h2>{question.question}</h2> */}
    
        {question.answerChoices.map((choice, index) => (
            <div key={index} 
                className={`choice-container ${selectedAnswer === index && 
                    classToApply}`}
                  onClick={()=> checkAnswer(index)}
                // className="choice-container"
              >
              <p className="choice-prefix">{index + 1}</p>
              <p 
                className="choice-text" 
                dangerouslySetInnerHTML={{__html: choice}}
              ></p>
            </div>

        ))}

    </div>
  )
}