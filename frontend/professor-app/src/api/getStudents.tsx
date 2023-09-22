import React, { useEffect, useState } from 'react';
import { Card, Text, Metric } from "@tremor/react";

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
            <div>
                {students.map((student: any) => (
                        <p>{student.username} {student.email} </p>
                    
                ))}
            </div>
            <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                <Text>Sales</Text>
                <Metric>$ 34,743</Metric>
            </Card>
        </div>
    );
}

export default GetStudents;