import React, { useEffect, useState } from 'react';

const STUDENT_ENDPOINT = 'http://localhost:8000/students/';

function GetStudents() {
    const [students, setStudents] = useState([]);
  
    useEffect (() => {
        fetch(STUDENT_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setStudents(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])
    

    const goToStudent = (studentId: number) => {
        window.location.replace(`/student/${studentId}`);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold py-2 pb-2">Students</h1>
            <div className="flex flex-row justify-center space-x-4">
            {students.map((student: any) => (
                <div className="w-64 h-44 max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Student #{student.id}</div>
                        <p className="text-gray-700 text-base">
                        Username: {student.username}
                        </p>
                        
                        <p className="text-gray-700 text-base">
                        {student.email}
                        </p>
                    </div>

                    <button onClick={() => goToStudent(student.id)} className="bg-transparent hover:bg-violet-400 text-violet-500 font-semibold hover:text-white py-2 px-4 border border-violet-400 hover:border-transparent rounded mb-1.5">
                        See Student
                    </button>
                </div>
            ))}
            </div>
        </div>
    );
}

export default GetStudents;