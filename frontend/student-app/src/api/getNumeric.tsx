import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {BlockMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

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
    combination: [];
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
    const [circuitType, setCircuitType] = useState<number | undefined>(0);
    const [numRes, setNumRes] = useState<number | undefined>(0);
    const [combination, setCombination] = useState <[] | undefined>([]);
    const [currentNumeric, setCurrentNumeric] = useState<NumericQuestion>()

    const [currentQuestion, setCurrentQuestion] = useState<Question>()
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


    useEffect (() => {
        for (let i=0; i<numericQuestions.length; i++){
            if (numericQuestions[i].question === 23){
                setCurrentNumeric(numericQuestions[i])
                console.log("currentNumeric",currentNumeric);
                setCombination(currentNumeric?.combination);
                console.log("combian",combination)
                // setCircuitType(combination![0]);
            }
        }
    }, [numericQuestions])
    



    useEffect (() => {
        fetchNumeric();
    }, [fetchNumeric])


    
    const generateLatexCode = (combination: Array<Number>) => {

        const circuit_type = combination[0]
        const num_res = combination[2]

        console.log("combinatiooon", combination)

        console.log('circuit type', circuitType)
        console.log('num res', numRes)
        if (circuit_type === 1){
            //circuito en paralelo
            if (num_res === 4){
                const latexCode = `$$
                \\usepackage{circuitikz}
                \\begin{circuitikz}
                    \\draw (0,0) to[V, v=${combination[1]}\\,V] (0,2);
                    \\draw (0,2) -- (2,2);
                    \\draw (0,0) -- (2,0);
                    \\draw (2,2) to[R, l=${combination[2]}\\, \\Omega] (2,0);
                    \\draw (2,2) -- (4,2);
                    \\draw (2,0) -- (4,0);
                    \\draw (4,2) to[R, l=${combination[3]}\\, \\Omega] (4,0);
                    \\draw (4,2) -- (6,2);
                    \\draw (4,0) -- (6,0);
                    \\draw (6,2) to[R, l=${combination[4]}\\, \\Omega] (6,0);
                    \\draw (6,2) -- (8,2);
                    \\draw (6,0) -- (8,0);
                    \\draw (8,2) to[R, l=${combination[5]}\\, \\Omega] (8,0);
                \\end{circuitikz}$$`;
                return latexCode;
            }
            else if(num_res === 3){
                const latexCode = `$$
                \\usepackage{circuitikz}
                \\begin{circuitikz}
                    \\draw (0,0) to[V, v=${combination[1]}\\,V$] (0,2);
                    \\draw (0,2) -- (2,2);
                    \\draw (0,0) -- (2,0);
                    \\draw (2,2) to[R, l=${combination[2]}\\, \\Omega] (2,0);
                    \\draw (2,0) -- (4,0);
                    \\draw (2,2) -- (4,2);
                    \\draw (4,2) to[R, l=${combination[3]}\\, \\Omega] (4,0);
                    \\draw (4,0) -- (6,0);
                    \\draw (4,2) -- (6,2);
                    \\draw (6,2) to[R, l=${combination[4]}\\, \\Omega] (6,0);
                \\end{circuitikz}$$`;
                return latexCode;
            }
            else{
                const latexCode = `$$
                \\usepackage{circuitikz}
                \\begin{circuitikz}
                    \\draw (0,0) to[V, v=${combination[1]}\\,V$] (0,2);
                    \\draw (0,2) -- (2,2);
                    \\draw (0,0) -- (2,0);
                    \\draw (2,2) to[R, l=${combination[2]}\\, \\Omega] (2,0);
                    \\draw (2,0) -- (4,0);
                    \\draw (2,2) -- (4,2);
                    \\draw (4,2) to[R, l=${combination[2]}\\, \\Omega] (4,0);
                \\end{circuitikz}$$`;
                return latexCode;
            }
            
        }
        else if (circuit_type === 0){
            //circuito en serie
            if (num_res === 4){
                const latexCode = `$$
                \\usepackage{circuitikz}
                \\begin{circuitikz}
                    \\draw (0,0) to[V, v=${combination[1]}\\,V$] (0,2)
                    to[R, l=${combination[2]}\\, \\Omega] (2,2)
                    to[R, l=${combination[3]}\\, \\Omega] (4,2)
                    to[R, l=${combination[4]}\\, \\Omega] (4,0)
                    to[R, l=${combination[5]}\\, \\Omega] (0,0);
                    \\draw (0,0) -- (4,0);
                \\end{circuitikz}$$`;
                return latexCode;
            }
            else if(num_res === 3){
                const latexCode = `$$
                \\usepackage{circuitikz}
                \\begin{circuitikz}
                \begin{circuitikz}
                    \\draw (0,0) to[V, v=${combination[1]}\\,V$] (0,2)
                                to[R, l=${combination[2]}\\, \\Omega] (2,2)
                                to[R, l=${combination[3]}\\, \\Omega] (4,2)
                                to[R, l=${combination[4]}\\, \\Omega] (4,0);
                    \\draw (0,0) -- (4,0);
                \\end{circuitikz}$$`;
                return latexCode;
            }
            else{
                const latexCode = `$$
                \\usepackage{circuitikz}
                \\begin{circuitikz}
                    \\draw (0,0) to[V, v=${combination[1]}\\,V$] (0,2)
                        to[R, l=${combination[2]}\\, \\Omega] (4,2)
                        to[R, l=${combination[3]}\\, \\Omega] (4,0);
                    \\draw (0,0) -- (4,0);
                \\end{circuitikz}$$`;
                return latexCode;
            }
        }
        
      };

      const frac = `$$\\frac{1}{2}$$`
      const latexCode = `$$
      \\usepackage{circuitikz};
      \\begin{figure}
        \\begin{circuitikz}
      \\draw (0,0) to[V, v=$V_f\\,V$] (0,2)
        to[R, l=$R_1$] (4,2)
        to[R, l=$R_2$] (4,0);
    \\draw (0,0) -- (4,0); 
    \\end{circuitikz}
    \\end{figure}$$`

    //   console.log("asjklfklfjklsdfjlk",combination,"asjklfklfjklsdfjlk")
    return (
        <div>
            
            {/* {combination} */}
            <Latex>
                {/* {circuitType !== undefined && numRes !== undefined && combination !== undefined && */}
                {/* {generateLatexCode(combination!)!} */}
                {/* {frac} */}
                {latexCode}
            </Latex>
            {/* <BlockMath math={frac} /> */}
            
        </div>
    )
    
}

export default GetNumeric;