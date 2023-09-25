import { BarChart, Card, Subtitle, Title } from '@tremor/react';
import React, { useEffect, useState } from 'react';

const STUDENT_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero.vercel.app/students/';

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

        students.map((student: any) => {
            levelss[student.level-1] += 1
        })
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
        console.log("dataaaa", data)
        console.log("levels", levels)

        return data
    }


    return (
        <div className="flex justify-center items-center">
            <Card className="w-3/4 mb-20">
                <h1 className="text-3xl font-bold"> General Progress </h1>
                <div className="flex">
                    {/* Table for showing students and its levels and xp */}
                    <table className="w-1/4 text-sm text-left text-gray-800 dark:text-gray-400 mt-3 mb-3">
                        <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                                <th className="px-1 py-1 text-sm"> Student </th>
                                <th> Level </th>
                                <th> XP </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student: any) => (
                                <tr key={student.id} className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                    <td> {student.username} </td>
                                    <td> Level {student.level} </td>
                                    <td> {student.xp} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Bar Chart for students by level */}
                    <Card className="w-2/4 ml-20">
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
                        // valueFormatter={dataFormatter}
                        yAxisWidth={48}
                        />
                    </Card>
                </div>
            </Card>
        </div>
    )
}

export default StudentsAndProgress;