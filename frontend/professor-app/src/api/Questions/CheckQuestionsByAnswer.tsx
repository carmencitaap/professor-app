import React, { useEffect, useState } from 'react';

import { Card, DonutChart } from "@tremor/react";

const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/';
const QUESTION_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/questions/';

function CheckQuestionsByAns() {
    const [students, setStudents] = useState([]);
    const [questions, setQuestions] = useState([]);
  
    useEffect (() => {
        fetch(STUDENT_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            // console.log("Students:",data);
            setStudents(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect (() => {
        fetch(QUESTION_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            // console.log("Questions:",data);
            setQuestions(data);
            })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect (() => {
        if (students.length > 0 && questions.length > 0) {
            calculateFrequencies(questions,students);
        }
    }, [students, questions])


    const calculateFrequencies = (questions: any, students: any) => {
        const questionFreqArray = []
        const typesAndFreq = [
            {
                subject: "Resistencias en serie y paralelo",
                frequency: 0,
            },
            {
                subject: "Kirchhoff - suma tensiones",
                frequency: 0,
            },
            {
                subject: "Kirchhoff - suma corrientes",
                frequency: 0,
            },
            {
                subject: "Tipos de condensadores",
                frequency: 0,
            },
            {
                subject: "Energía de un condensador",
                frequency: 0,
            },
            {
                subject: "Carga de un condensador",
                frequency: 0,
            }
        ]

        if (questions && students) {
            for (let i=0; i<questions.length; i++) {
                const questionFreq = {
                    question_id: questions[i].id,
                    frequency: 0,
                    subject: questions[i].type_subject
                }
                for (let j=0; j<students.length; j++) {
                    if (students[j].incorrectly_answered_questions) {
                        for (let k=0; k<students[j].incorrectly_answered_questions.length; k++) {
                            if (students[j].incorrectly_answered_questions[k] === questions[i].id) {
                                questionFreq.frequency += 1
                            }
                        }
                    }
                }
                questionFreqArray.push(questionFreq)
            }
            // console.log("Incorrect frequency per question:",questionFreqArray)

            for (let i=0; i<questionFreqArray.length; i++) {
                if (questionFreqArray[i].frequency > 0) {
                        if (questionFreqArray[i].subject === "Resistencias en serie y paralelo") {
                            typesAndFreq[0]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Kirchhoff - suma tensiones") {
                            typesAndFreq[1]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Kirchhoff - suma corrientes") {
                            typesAndFreq[2]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Tipos de condensadores") {
                            typesAndFreq[3]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Energía de un condensador") {
                            typesAndFreq[4]['frequency'] += questionFreqArray[i].frequency
                        }
                        else if (questionFreqArray[i].subject === "Carga de un condensador") {
                            typesAndFreq[5]['frequency'] += questionFreqArray[i].frequency
                        }

                    // console.log("types and freq", typesAndFreq)
                }
            }
        }
       return typesAndFreq;
    }

    return (
        <div className="flex justify-center items-center">
            <Card className="w-1/3 mb-10">
                <h1 className="text-2xl font-semibold"> Questions that have been the hardest </h1>
                <h4 className="text-sm font-light"> By how many times they were answered incorrectly </h4>
                <DonutChart
                className="mt-6"
                data={calculateFrequencies(questions,students)}
                category="frequency"
                index="subject"
                variant='pie'
                colors={["violet", "indigo", "rose", "cyan", "amber"]}
                />
            </Card>
        </div>
    );
}

export default CheckQuestionsByAns;