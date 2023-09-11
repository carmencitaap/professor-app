import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StartTaskFB from '../components/callStart';
import GetAlternatives from './getAlternative';


interface Task {
    id: number;
    questions: [];
    name: String;
    student: number; //student id fk
    description: String;
    type_task: String;
    state: String;
    xp_in_task: number;
    difficulty: String;
    wrong_answer: [];

}

interface Student {
    id: number;
    username: String;
    email: String;
    xp: number;
    level: number;
    correctly_answered_questions: [];
    incorrectly_answered_questions: [];
    questions_pased: [];
    used_combinations: [];
    task_count: number;
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

interface Alternative {
    id: number;
    alternative_question: number; //question id fk
    answer: String;
    is_correct: Boolean;
}

interface AlternativeQuestion {
    id: number;
    question: number; //question id fk
    alternatives: [];
}


const TASK_ENDPOINT =  'https://tsqrmn8j-8000.brs.devtunnels.ms/tasks/'
const NUMERICQ_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/numericquestion/'
const STUDENT_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/students/'
const ALTERNATIVEQ_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/alternativequestion/'
const QUESTIONS_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/questions/'
const ALTERNATIVE_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/alternative/'

// https://tsqrmn8j-8000.brs.devtunnels.ms/students/

function GetTask(){
    const [task, setTask] = useState<Task>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [numericQuestions, setNumericQuestions] = useState<NumericQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [student, setStudent] = useState<Student>();
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [alternativeQ, setAlternativeQ] = useState<AlternativeQuestion[]>([]);
    const {studentId} = useParams();
    const {taskId} = useParams();

    useEffect (() => {
        fetch(STUDENT_ENDPOINT+studentId+'/')
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setStudent(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [studentId])

    // useEffect (() =>{
    //     fetch(QUESTIONS_ENDPOINT + `?task=${taskId}`)
    //     .then((response) => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setStudent(data)
    //       })
    //     .catch((err) => {
    //         console.log(err.message)
    //     })
    // }, [taskId])

    // const getNumericQ = (questionId: any) => {
    //     fetch(NUMERICQ_ENDPOINT + `?question=${questionId}`)
    //     .then((response) => response.json())
    //     .then(data => {
    //         console.log("numeric", data);
    //         setNumericQuestions(data)
    //       })
    //     .catch((err) => {
    //         console.log(err.message)
    //     })
    // }


    useEffect(() => {
        fetch(ALTERNATIVE_ENDPOINT + taskId+'/')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setQuestions(data.questions);
    
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, [taskId]);

      const getAlternativeQ = (questionId: any) => {
        fetch(ALTERNATIVEQ_ENDPOINT + `?question=${questionId}`)
        .then((response) => response.json())
        .then(data => {
            console.log("alternative", data);
            setAlternativeQ(data)
            console.log("alternativeQ",alternativeQ)
            setAlternatives(data['alternatives'])
            console.log("dfskfl",alternatives)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }



    
    // if (questions?.length === 0) {
    //     return <p className='margin'>Loading...</p>;
    //   }
    
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="div-question">
            {/* <StartTaskFB taskId={taskId}/> */}
            {questions?.map((question) => {
                getAlternativeQ(question?.id)
                return (
                <div key={question.id}>
                    <p>{question.question}</p>
                    <p>Difficulty: {question.difficulty}</p>
                    <GetAlternatives questionId={question.id}/> 
                </div>
                );
            })}
        </div>
      );

}

export default GetTask;