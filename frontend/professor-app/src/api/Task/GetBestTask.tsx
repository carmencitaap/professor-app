import React, { useCallback, useEffect, useState } from 'react';

const TASKS_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/tasks/'
const STUDENTS_ENPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/'

function GetBestTask() {
    // primero me traigo todos las tasks
    // me traigo todos los students

    // me traigo cada task de cada student

    // me traigo las correct answers y las incorrect answers de cada student

    // si de la student task, las preguntas, si está en las correct answers del user la marco como buena
    // si de la student task, las preguntas, si está en las incorrect answers del user la marco como mala

    // con eso obtengo el score de cada tarea, con (correct questions/total questions)*100
    // si tiene 100 me la traigo

    const [tasks, setTasks] = useState([]);
    const [students, setStudents] = useState([]);

    const fetchTasks = useCallback(() => {
        fetch(TASKS_ENDPOINT) 
            .then(response => response.json())
            .then(data => {
                console.log("Tasks:",data)
                setTasks(data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    useEffect (() => {
        fetchTasks();
    }, [fetchTasks]);

    const fetchStudents = useCallback(() => {
        fetch(STUDENTS_ENPOINT)
            .then(response => response.json())
            .then(data => {
                console.log("Students:",data)
                setStudents(data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    useEffect (() => {
        fetchStudents();
    }, [fetchStudents]);

    const userTask = [];
    const data = {
        task: 0,
        user_id: 0
    }




    return (
        <div>
            <h1>GetBestTask</h1>
        </div>
    )
}

export default GetBestTask;