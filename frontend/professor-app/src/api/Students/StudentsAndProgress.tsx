import { BarChart, Card, Subtitle, Title } from '@tremor/react';
import React, { useEffect, useState } from 'react';
import XPTable from './XPTable';

const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/students/';

function StudentsAndProgress() {
    const [students, setStudents] = useState([]);
    const [levels, setLevels] = useState([0,0,0,0,0,0,0,0,0,0,0])
  
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

    useEffect (() => {
        const levelss = [0,0,0,0,0,0,0,0,0,0]

        students.map((student: any) => (
            levelss[student.level-1] += 1
        ))
        setLevels(levelss)
    }, [students])

    const setFreqLevels = () => {
        const data = []
        for (let i = 0; i < (levels.length); i++) {
            const eachLevel = {
                level: i+1,
                students: levels[i]
            }
            data.push(eachLevel)
        }
        return data
    }


    return (
        <div className="flex flex-col">
            <div className="flex justify-center items-center">
                <Card className="w-3/4 mb-16">
                    <h1 className="text-3xl font-bold mb-4"> General Progress </h1>
                    <div className="flex">
                        {/* Table for showing students and its levels and xp */}
                        <div className="mr-10">
                        <table className="w-1/4 text-sm text-left text-gray-800 mt-3 mb-3">
                            <thead className="border-b bg-white font-medium">
                                <tr>
                                    <th className="px-1 py-1 text-sm"> Student </th>
                                    <th> Level </th>
                                    <th> XP </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student: any) => (
                                    <tr key={student.id} className="border-b hover:bg-neutral-100">
                                        <td className="whitespace-nowrap px-2 py-4"> {student.username} </td>
                                        <td className="whitespace-nowrap px-2 py-4"> Level {student.level} </td>
                                        <td className="whitespace-nowrap px-2 py-4"> {student.xp} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        
                        {/* Bar Chart for students by level */}
                        <div>
                            <Card className="h-50 ml-20" style= {{width:'580px'}}>
                                <Title> Students by level </Title>
                                <Subtitle>
                                    Frequency of students per each level
                                </Subtitle>
                                <BarChart
                                className="mt-6 h-56"
                                data={setFreqLevels()}
                                index="level"
                                categories={["students"]}
                                colors={["blue"]}
                                yAxisWidth={48}
                                />
                            </Card>
                        </div>

                        <div>
                            <XPTable/>
                        </div>
                    </div>
                </Card>

                
            </div>

            <div className="flex justify-center items-center">
                <Card className="w-2/4 mb-16">
                    <Title> Use time in tasks </Title>
                    <Subtitle> Total time and average </Subtitle>
                    <table className="w-2/4 text-sm text-left text-gray-800 mt-3 mb-3 ml-3">
                        <thead className="border-b bg-white font-medium">
                            <tr>
                                <th className="px-1 py-1 text-sm"> Student </th>
                                <th className="px-1 py-1 text-sm"> Time in task </th>
                                <th className="px-1 py-1 text-sm"> AVG (Minutes) </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student: any) => (
                                <tr key={student.id} className="border-b hover:bg-neutral-100">
                                    <td className="whitespace-nowrap px-2 py-4"> {student.username} </td>
                                    <td className="whitespace-nowrap px-2 py-4"> {student.time_connected.split('.')[0]} </td>
                                    <td className="whitespace-nowrap px-2 py-4">
                                        {((Number(student.time_connected.split(':')[0]))*60+Number(student.time_connected.split(':')[1])+(Number(student.time_connected.split(':')[2].split('.')[0]))/60).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}

export default StudentsAndProgress;