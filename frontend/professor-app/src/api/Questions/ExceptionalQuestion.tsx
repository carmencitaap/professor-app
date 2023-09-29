import { Card } from '@tremor/react';
import React, { useCallback, useEffect, useState } from 'react';

const STUDENTS_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/students/';
const QUESTION_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/questions/';


function ExceptionalQuestion() {
    const [students, setStudents] = useState([]);

    const [mostIncorrectly, setMostIncorrectly] = useState(null);
    const [showIncorrectly, setShowIncorrectly] = useState(false);
    const [mostIncorrectlyQuestion, setMostIncorrectlyQuestion] = useState(null);



    const fetchStudents = useCallback(() => {
        fetch(`${STUDENTS_ENDPOINT}`)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setStudents(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents])

    const checkCorrectAnswers = useCallback(() => {
        const allIncorrectlyAnsweredQuestions = []
    
        if (students) {
            const incorrectlyFrequency = {}
            students.forEach((student) => {
                // console.log(student)
                if (student.incorrectly_answered_questions.length > 0) {
                    student.incorrectly_answered_questions.forEach((question) => {
                        // console.log(question)
                        allIncorrectlyAnsweredQuestions.push(question)
                    })
                }
            })

            allIncorrectlyAnsweredQuestions?.forEach((question) => {
                if (incorrectlyFrequency[question]) {
                    incorrectlyFrequency[question] += 1
                } else {
                    incorrectlyFrequency[question] = 1
                }
            })

            const toSortI = Object.entries(incorrectlyFrequency)
            const sortedIncorrect = toSortI.sort((a, b) => Number(b[1]) - Number(a[1]))


            // setMostCorrectly(sortedCorrect[0][0])
            console.log("jdkfldkjf",sortedIncorrect)
            if (sortedIncorrect.length > 0 ) {
                setMostIncorrectly(sortedIncorrect[0][0])
            }
        }
        }, [students])
    
    useEffect(() => {
        checkCorrectAnswers();
    }, [students, checkCorrectAnswers])

    const fetchQuestion = (question_id) => {
        fetch(`${QUESTION_ENDPOINT}${question_id}/`)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setMostIncorrectlyQuestion(data.question)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const showIncorrectlyAnswered = () => {
        setShowIncorrectly(!showIncorrectly)
    }


    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6" onClick={() => {fetchQuestion(Number(mostIncorrectly)); showIncorrectlyAnswered() }} > See exceptional questions! </button>
            <div>
            {showIncorrectly && (
                <div className="flex justify-center items-center">
                    <Card className="w-2/4 mb-20"> {mostIncorrectlyQuestion && mostIncorrectlyQuestion} </Card>
                </div>
            )
            }
            
            </div>
        </div>
    )
}

export default ExceptionalQuestion;