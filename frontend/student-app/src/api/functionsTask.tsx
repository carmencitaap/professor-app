import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Task {
    id: number;
    questions: [];
    name: String;
    description: String;
    type_task: String;
    state: String;
    xp_in_task: number;
    difficulty: String;
    wrong_answer: [];

}

interface Question {
    id: number;
    question: String;
    type_question: String;
    type_subject: String;
    difficulty: String;
    hint: String;
}

interface NumericQuestion {
    id: number;
    answer: String;
    combination: [];
    question: number;
}

const TASK_ENDPOINT =  'https://tsqrmn8j-8000.brs.devtunnels.ms/tasks/5/'
const NUMERICQ_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/numericquestion/'

// https://tsqrmn8j-8000.brs.devtunnels.ms/students/

function GetTask(){
    const [task, setTask] = useState<Task>();
    const [questions, setQuestions] = useState<Question[]>([])
    const [numericQuestions, setNumericQuestions] = useState<NumericQuestion[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    useEffect (() => {
        fetch(TASK_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTask(data)
            setQuestions(data['questions'])
            console.log("iiretuiteriuo",questions)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect (() => {
        fetch(NUMERICQ_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log("numeric", data);
            setNumericQuestions(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])



    // if (questions?.length === 0) {
    //     return <p className='margin'>Loading...</p>;
    //   }
    
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="div-question">
            <div className="div-question">
            {questions.map((questionObj) => (
                <div key={questionObj['id']}>
                <p>{questionObj['question']}</p>
                <p>Type: {questionObj['type_question']}</p>
                <p>Subject: {questionObj['type_subject']}</p>
                <p>Difficulty: {questionObj['difficulty']}</p>
                <p>Hint: {questionObj['hint']}</p>
                </div>
            ))}
            </div>

        </div>
    )
      

}

export default GetTask;