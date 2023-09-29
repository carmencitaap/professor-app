import React, { useEffect, useState } from 'react';

const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/students/';

function StudentsByXP() {
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
            <h1 className="font-semibold text-xl"> Other students... </h1>
            <div className="flex flex-wrap mt-1 mb-3 justify-center items-center">
                {students.map((student: any) => (
                    <div className="p-2 w-72" key={student.id}>
                        <div className="flex rounded-lg h-full bg-fuchsia-100 px-3 pb-2 pt-1.5 flex-col border border-fuchsia-300">
                            <div className="flex mb-3 justify-start">
                                <div className="w-6 h-6 mr-3 inline-flex items-center justify-center rounded-full bg-purple-400 text-white font-semibold flex-shrink-0 top-0">
                                    {student.id}
                                </div>
                                <h1 className="text-gray-800 text-m font-medium">
                                    {student.username}
                                </h1>
                                <div className="ml-2"> Level {student.level} </div>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-purple-800">XP</span>
                                <span className="text-sm font-medium text-purple-800">{(((student.xp)*100)/1200) > 100 ? "100" : (((student.xp)*100)/1200)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-purple-800 h-2.5 rounded-full" style={{ width: `${(((student.xp)*100)/1200) > 100 ? "100" : (((student.xp)*100)/1200)}%`}}></div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentsByXP;