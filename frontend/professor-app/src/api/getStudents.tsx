import React, { useEffect, useState } from 'react';
import { Card, Text } from "@tremor/react";

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
    

    
    return (
        <div>
            <h1>Students</h1>
            <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                {students.map((student: any) => (
                        <Text>{student.username} {student.email} </Text>
                    
                ))}
            </Card>
        </div>
    );
}

export default GetStudents;