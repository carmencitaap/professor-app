import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button } from "@material-tailwind/react";

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import Serie2Resist from '../diagrams/serie2Resist';
import Serie3Resist from '../diagrams/serie3Resist';
import Serie4Resist from '../diagrams/serie4Resist';
import Paralelo2Res from '../diagrams/paralelo2Res';
import Paralelo3Res from '../diagrams/paralelo3Res';
import Paralelo4Res from '../diagrams/parelelo4Res';
import Mixto3Res from '../diagrams/mixto3Res';
import Mixto4ResTipo1 from '../diagrams/mixto4ResTipo1';
import Mixto4ResTipo2 from '../diagrams/mixto4ResTipo2';
// import ElectricCircuit from './adiagram';

interface Task {
    id: number;
    questions: [];
    name: string;
    student: number; //student id fk
    description: string;
    type_task: string;
    state: string;
    xp_in_task: number;
    difficulty: string;
    wrong_answer: [];

}

interface Student {
    id: number;
    username: string;
    email: string;
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
    question: string;
    type_question: string;
    type_subject: string;
    difficulty: string;
    hint: string;
}

interface NumericQuestion {
    id: number;
    answer: string;
    combination: string;
    question: number;
}

interface getNumericProps{
    questionId: number;
}

const TASK_ENDPOINT =  'https://tsqrmn8j-8000.brs.devtunnels.ms/tasks/'
const NUMERICQ_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/numericquestion/'
const STUDENT_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/students/'
const QUESTIONS_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/questions/'

//{questionId}: getNumericProps

function GetNumeric() {

    const {studentId} = useParams();
    const {taskId} = useParams();
    const [student, setStudent] = useState<Student>();
    const [task, setTask] = useState<Task>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [numericQuestions, setNumericQuestions] = useState<NumericQuestion[]>([]);
    const [lengthComb, setLengthComb] = useState<number | undefined>(0);
    const [circuitType, setCircuitType] = useState<string | undefined>('');
    const [numRes, setNumRes] = useState<string | undefined>('');
    const [combination, setCombination] = useState <string[]>([]);
    const [currentNumeric, setCurrentNumeric] = useState<NumericQuestion>()
    const [volt, setVolt] = useState<string | undefined>('')

    const [currentQuestion, setCurrentQuestion] = useState<Question>()
    const [listAnswer, setListAnswer] = useState<string []>([])
    // useEffect (() => {
    //     fetch(STUDENT_ENDPOINT+studentId+'/')
    //     .then((response) => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setStudent(data)
    //       })
    //     .catch((err) => {
    //         console.log(err.message)
    //     })
    // }, [studentId])

    

    const fetchNumeric = useCallback(() => {
        fetch(NUMERICQ_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log("afsdfgsdgfd",data);
            setNumericQuestions(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])


    useEffect(() => {
        for (let i = 0; i < numericQuestions.length; i++) {
          if (numericQuestions[i].question === 1) {
            setCurrentNumeric(numericQuestions[i]);
          }
        }
      }, [numericQuestions]);
      
      useEffect(() => {
        if (currentNumeric) {
          const currentCombination = currentNumeric.combination;
          if (currentCombination) {
            const combinationArray = currentCombination.split(',');
            setCombination(combinationArray);
            if (combinationArray.length > 1) {
              setVolt(combinationArray[1]);
              setNumRes(combinationArray[2]);
              setCircuitType(combinationArray[0])
            }
          }
        }
      }, [currentNumeric]);
      
    



    useEffect (() => {
        fetchNumeric();
    }, [fetchNumeric])

    const commaRegex: RegExp = /,/;

    if (currentNumeric?.answer !== undefined && commaRegex.test(currentNumeric.answer)) {
        setListAnswer(currentNumeric.answer.split(','))
    } 
      



    //   console.log("asjklfklfjklsdfjlk",combination,"asjklfklfjklsdfjlk")
    return (
        <div>
            {circuitType === '0' && numRes === '2' && (
                <Serie2Resist volt={volt} r1={combination[3]} r2={combination[4]} />
            )}
            {circuitType === '0' && numRes === '3' && (
                <Serie3Resist volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )}
            {/* {circuitType === '0' && numRes === '4' && (
                <Serie4Resist volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]}/>
            )} */}

            {/* {circuitType === '1' && numRes === '2' && (
                <Paralelo2Res volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )} */}
            {/* {circuitType === '1' && numRes === '3' && (
                <Paralelo3Res volt={volt}r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )} */}
            {/* {circuitType === '1' && numRes === '4' && (
                <Paralelo4Res volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]}/>
            )} */}
            {/* {circuitType === '2' && numRes === '3' && (
                <Mixto3Res volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]}/>
            )} */}
            {/* {circuitType === '3' && numRes === '4' && (
                <Mixto4ResTipo1 volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]}/>
            )} */}
            {/* {circuitType === '4' && numRes === '4' && (
                <Mixto4ResTipo2 volt={volt} r1={combination[3]} r2={combination[4]} r3={combination[5]} r4={combination[6]}/>
            )} */}
            
            <Serie4Resist volt={10} r1={10} r2={10} r3={10} r4={10}/>

            {listAnswer.length > 0 && (
                <div className="relative flex w-full max-w-[24rem]">
                <Input
                  type="answer"
                  label="Answer"
                  value={email}
                  onChange={onChange}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button
                  size="sm"
                  color={email ? "gray" : "blue-gray"}
                  disabled={!email}
                  className="!absolute right-1 top-1 rounded"
                >
                  Invite
                </Button>
              </div>
            ) }
    
        </div>
        
    )
    
}

export default GetNumeric;