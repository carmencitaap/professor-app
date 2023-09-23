import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const STUDENT_ENDPOINT = 'http://localhost:8000/students/';
const TASK_ENDPOINT = 'http://localhost:8000/tasks/';
function GetStudent() {
    const [student, setStudent] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [studentTask, setStudentTask] = useState();
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
                    setStudentTask(tasks[i]);
                    console.log(studentTask);
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
    return (
        <div>
            <div className='text-2xl font-semibold py-3'> Stats for {student['username']} </div>
            
            <div className="flex justify-center">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div> Student Last Task: {studentTask && studentTask['id']} </div>
                    </div>
                </div>
            </div>
            





            <button onClick={() => handleGoBack()} className="bg-transparent hover:bg-violet-400 text-violet-500 font-semibold hover:text-white py-2 px-4 border border-violet-400 hover:border-transparent rounded mb-1.5">
                Go back to all students
            </button>
        </div>
    )
}

export default GetStudent;