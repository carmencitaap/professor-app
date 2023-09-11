import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  questions: [];
  // ... Otras propiedades de la tarea
}

interface Question {
  id: number;
  question: string;
  // ... Otras propiedades de la pregunta
}

interface Alternative {
  id: number;
  alternative_question: number;
  answer: string;
  is_correct: boolean;
}

interface AnswerAQProps {
  questions: Question[];
  taskId: number;
  studentId: number;
}

const ALTERNATIVE_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/alternative/'
const QUESTIONS_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/questions/'

function AnswerAQ({ questions, taskId, studentId }: AnswerAQProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentAlternatives, setCurrentAlternatives] = useState<Alternative[]>([]);
  const [allAlternatives, setAllAlternatives] = useState<Alternative[]>([]);
  const [serverResponse, setServerResponse] = useState<string | null>(null);
  const [selectedAlternative, setSelectedAlternative] = useState<number | null>(null);


  useEffect(() => {
    // Obtener todas las alternativas sin importar la pregunta
    fetch(ALTERNATIVE_ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
            console.log("alternatives", data);
            setAllAlternatives(data);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, []);

    useEffect(() => {
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
          const question = questions[currentQuestionIndex];
          setCurrentQuestion(question);

          // Filtra las alternativas basadas en 'alternative_question' igual a 'question.id'
          const filteredAlternatives = allAlternatives.filter(
            (alternative) => alternative.alternative_question === question.id
          );
          setCurrentAlternatives(filteredAlternatives);
        }
    }, [currentQuestionIndex, questions, allAlternatives]);



  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };



  const handleAnswerQuestion = async (alternativeId: number, currentQuestion: number) => {
    try {
      const response = await fetch(QUESTIONS_ENDPOINT+currentQuestion+'/validate_a_answer/'+alternativeId+'/'+taskId+'/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alternativeId: alternativeId,
          questionId: currentQuestion,
          taskId: taskId,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setServerResponse(data.message);
      } else {
        console.error('Error in response:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Avanzar a la siguiente pregunta después de responder
    handleNextQuestion();
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">{currentQuestion?.question}</h1>
      <ul>
        {currentAlternatives.map((alternative) => (
          <li key={alternative.id} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                className="form-radio"
                name="alternative"
                value={alternative.id}
                onChange={() => setSelectedAlternative(alternative.id)}
              />
              <span>{alternative.answer}</span>
            </label>
          </li>
        ))}
      </ul>
      {currentQuestionIndex < questions.length - 1 && (
        <button
          onClick={() => {
            if (selectedAlternative !== null && selectedAlternative !== undefined && currentQuestion !== null) {
              handleAnswerQuestion(selectedAlternative, currentQuestion?.id);
            }
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next Question
        </button>
      )}
    </div>
  );
  
  
  
}

export default AnswerAQ;
