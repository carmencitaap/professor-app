import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const STUDENT_ENDPOINT = 'http://localhost:8000/students/';

function GetStudent() {
    const [student, setStudent] = useState([]);
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


    
    const handleGoBack = () => {
        window.location.replace('/studentsindex');
    }
    return (
        <div>
            <h1>GetStudent</h1>
            <button onClick={() => handleGoBack()} className="bg-transparent hover:bg-violet-400 text-violet-500 font-semibold hover:text-white py-2 px-4 border border-violet-400 hover:border-transparent rounded mb-1.5">
                Go back to all students
            </button>
        </div>
    )
}

export default GetStudent;