import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import StudentProgress from './StudentProgressBySubj';
import StudentsByXP from './StudentsByXP';


const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/';
const TASK_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/';

function GetStudent() {
    const [student, setStudent] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [studentTask, setStudentTask] = useState();
    const [taskQuestions, setTaskQuestions] = useState([]);
    const [dataTask, setDataTask] = useState({});
    // const [studentTasks, setStudentTasks] = useState([]);
    const { studentId } = useParams();

    const fetchStudent = useCallback(() => {
        fetch(`${STUDENT_ENDPOINT}${studentId}/`)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setStudent(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [studentId])

    useEffect(() => {
        fetchStudent();
    }, [fetchStudent])

    const fetchTasks = useCallback(() => {
        fetch(`${TASK_ENDPOINT}`)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTasks(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks])

    const funcSetStudentTask = () => {
        if (tasks) {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].student === student['id']) {      
                    console.log("SIUUU ")
                    console.log("tasks",tasks[i]) 
                    setStudentTask(tasks[i]);
                    setTaskQuestions(tasks[i].questions)
                }
            }
        }
    }
    
    useEffect(() => {
        funcSetStudentTask();
    }, [tasks, student])

    const handleGoBack = () => {
        window.location.replace('/studentsindex');
    }

    useEffect(() => {
        if (studentTask && taskQuestions) {
            getCorrectAndIncorrectByTask()
        }
    }, [studentTask,taskQuestions])

    const getCorrectAndIncorrectByTask = () => {
        console.log("student Task", studentTask);
        console.log("task questions", taskQuestions);

        
        if (studentTask && taskQuestions) {
            const dataTask = {
                task: studentTask['id'],
                student: student['id'],
                number_of_questions: taskQuestions.length,
                correct: 0,
                incorrect: 0
            }

            for (let i=0; i<taskQuestions.length; i++) {
                if (student['correctly_answered_questions'].includes(taskQuestions[i]['id'])) {
                    dataTask['correct'] += 1
                } else if (student['correctly_answered_questions'].includes(taskQuestions[i]['id'])) {
                    dataTask['incorrect'] += 1
                }
            }
            console.log("dataTask", dataTask);
            setDataTask(dataTask)
            return dataTask;
        }

    }

    return (
        <div>
            <div className='text-2xl font-semibold py-3'> Stats for {student['username']} </div>
            
            <div className="flex justify-center items-center">
                <div className="w-2/4 rounded overflow-hidden shadow-lg bg-slate-50 mb-3">
                    <div className="flex justify-center items-center"> 
                        <div className="w-48 rounded overflow-hidden shadow-lg bg-slate-50 mt-3">
                            <h1 className="text-xl font-semibold p-1"> Last login </h1> 
                            <div>
                                Day: {student['last_login'] && student['last_login'].split('T')[0]}
                            </div>
                            <div>
                                Time: {student['last_login'] && student['last_login'].split('T')[1].split('.')[0]}
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 flex justify-center items-center">
                        <div className="w-52 shadow-lg bg-slate-50 mb-3 p-3">
                            <h1 className="text-xl font-semibold"> Student Last Task</h1>
                            {(studentTask && studentTask['type_task'] === "AQ" && (
                                <div>
                                    <div className="p-0.5"> ID: {studentTask && studentTask['id']} </div>
                                    <div className="p-0.5"> Correct Answers: {dataTask && dataTask['correct']} </div>
                                    <div className="p-0.5"> Incorrect Answers: {dataTask && dataTask['incorrect']} </div>
                                    <div className="p-0.5"> Total score: {dataTask && dataTask['correct']}/{dataTask && dataTask['number_of_questions']} </div>
                                    <div className="p-0.5"> Score percentage: {dataTask && (dataTask['correct']/dataTask['number_of_questions'])*100}% </div>
                                </div>
                                ))}
                            {/* {(studentTask && studentTask['type_task'] === "N" && (

                                ))} */}
                        </div>
                    </div>
                    <div className="flex mb-3">
                        <div className="w-52"></div>
                        <StudentProgress/>
                    </div>

                    <StudentsByXP/>
            
                </div>
            </div>
            
            <button onClick={() => handleGoBack()} className="bg-transparent button-pink font-semibold hover:text-white py-2 px-4 border border-violet-400 hover:border-transparent rounded mb-5">
                Go back to all students
            </button>
        </div>
    )
}

export default GetStudent;