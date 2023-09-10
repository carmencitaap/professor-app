import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

const TASK_ENDPOINT =  'https://tsqrmn8j-8000.brs.devtunnels.ms/tasks/'
const STUDENT_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/students/'

function CreateTask() {
    const [student, setStudent] = useState<Student>();
    const [taskDiff, setTaskDiff] = useState<String>('Easy')
    const [taskType, setTaskType] = useState<String>('AQ')
    const {studentId} = useParams();
    console.log("fsdjlfdskjlfljkds",studentId)
    useEffect (() => {
        fetch(STUDENT_ENDPOINT+studentId+'/')
        .then((response) => response.json())
        .then(data => {
            console.log("studenttttt",data);
            setStudent(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [studentId])

    if (student?.level === 1 || student?.level === 2){
        setTaskDiff('Easy')
    }
    else if (student?.level === 3 || student?.level === 4 || student?.level === 5 || student?.level === 5 || student?.level === 6 || student?.level === 7){
        setTaskDiff('Medium')
    }
    else{
        setTaskDiff('Hard')
    }

    if (student?.task_count === 0 || (student && student.task_count !== undefined && student?.task_count % 2 === 0)){
        setTaskType('AQ')
    }
    else {
        setTaskType('N')
    }

    const createTask = async (studentId: any, taskDiff: String, taskType: String) => {
        await fetch(TASK_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                name: 'Task for ' + student?.username,
                type_task: taskType,
                difficulty: taskDiff,
                student: studentId,

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => {
            console.log(err.message)
        })
        console.log("TASK CREATED SUCCESSFULLY")
    };

    return (
        <div>
            <button> Comenzar Tarea</button>  
        </div>
    )

}

export default CreateTask;