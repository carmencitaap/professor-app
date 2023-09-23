import React, { useState, useEffect, useCallback } from 'react';

import { TrashIcon, PencilIcon } from '@heroicons/react/solid';


const QUESTION_ENDPOINT = "http://localhost:8000/questions/"


function AlternativeQuestionsIndex() {
    const [questions, setQuestions] = useState([]);

    const fetchQuestions = useCallback(() => {
        fetch(QUESTION_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setQuestions(data)
            })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect (() => {
        fetchQuestions()
    }, [fetchQuestions])

    const handleOnClick = () => {
        window.location.replace("/newaq");
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative overflow-x-auto w-4/5">
                <div className="flex">
                    <div className="w-10/12"></div>
                    <button onClick={()=> handleOnClick()} className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"> + Create Question </button>
                </div>
                <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-3 mb-3">
                    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
                            <th className="px-6 py-4 text-lg"> Number </th>
                            <th className="px-6 py-4 text-lg"> Question </th>
                            <th className="px-6 py-4 text-lg"> Type </th>
                            <th className="px-6 py-4 text-lg"> Subject </th>
                            <th className="px-6 py-4 text-lg"> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                    {questions.map((question: any) => (
                        <tr key={question.id} className="border-b bg-neutral-50 hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{question.id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{question.question}</td>
                            <td className="whitespace-nowrap px-6 py-4">{question.type_question}</td>
                            <td className="whitespace-nowrap px-6 py-4">{question.type_subject}</td>
                            <td className="flex">
                                
                                <PencilIcon className="h-7 w-7 text gray-400 mt-3 mr-5"/>
                                <TrashIcon className="h-7 w-7 text-red-600 mt-3"/>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AlternativeQuestionsIndex;