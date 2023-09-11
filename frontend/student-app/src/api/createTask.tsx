import React, { useState, useEffect, useRef } from 'react';
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
    const {studentId} = useParams();
    const [student, setStudent] = useState<Student>();
    const prevStudent = useRef<string | undefined >();

    const [taskDiff, setTaskDiff] = useState<String>('Easy')
    const [taskType, setTaskType] = useState<String>('AQ')

    const [tasks, setTasks] = useState<Task[]>([])
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    const [taskId, setTaskId] = useState<number | null>(null);

    // console.log(student?.username)
    useEffect (() => {
        // Student API call
        if (studentId !== prevStudent.current) {
            prevStudent.current = studentId;

            fetch(STUDENT_ENDPOINT+studentId+'/')
            .then((response) => response.json())
            .then(data => {
                console.log("studenttttt",data);
                console.log("username", data.username);
                setStudent(data);
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }, [studentId])

        

    useEffect(() => {
        // Set task difficult
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
    }, [student])

    const fetchTask = useRef<boolean>(true);

    useEffect (() => {
        if (fetchTask.current) {
            fetch(TASK_ENDPOINT + `?student=${studentId}`)
            .then((response) => response.json())
            .then(data => {
                if (data.length > 0) {
                    // If a task exists, set it as the current task
                    setCurrentTask(data[0]); // Assuming you want to work with the first task found
                } else {
                    // If no task exists, create a new task for the student
                    fetch(TASK_ENDPOINT, {
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
                    .then((json) => {console.log(json); setCurrentTask(json); setTaskId(json.id);})
                    .catch((err) => {
                        console.log(err.message)
                    })
                }
            })
            .catch((err) => {
                console.log(err.message)
            })

            fetchTask.current = false
        }
        // console.log("safdklfdkslj",currentTask)
    }, [studentId, taskDiff, taskType, student?.username])

    console.log(currentTask)
    useEffect(() => {
        fetch (TASK_ENDPOINT+currentTask?.id+'/questions_to_task/?student_id='+studentId,{method: 'POST', headers: {'Content-type': 'application/json; charset=UTF-8',},})
    })

    const handleButton = () => { 
        if (currentTask) {
            window.location.replace('http://localhost:3000/'+studentId+'/answertask/'+currentTask?.id)
        }
    }
    
    console.log("safdklfdkslj",currentTask)
    return (
        <div className="grid h-screen place-items-center">
            <div className="grid grid-rows-2 gap-4">
                <p className='font-bold text-lilac-600 content-center text-xl'> ¡Bienvenid@, {student?.username}!</p>
                <p className='font-bold text-lilac-500'> Tienes una tarea por realizar</p>
                <div>
                    <button onClick={() => {handleButton()}} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-1/2 "> Comenzar Tarea</button> 
                </div> 
            </div>
            
        </div>
    )
        
}

export default CreateTask;