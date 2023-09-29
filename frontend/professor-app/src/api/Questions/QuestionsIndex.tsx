import React, { useState, useEffect, useCallback } from 'react';

import { TrashIcon, PencilIcon } from '@heroicons/react/solid';


import CreateAQ from '../Alternatives/NewAlternativeQuestion';
import GetAlternatives from '../Alternatives/AlternativesIndex';
import EditQuestion from './EditQuestion';


const QUESTION_ENDPOINT = "https://pds-p2-g5-avendano-brito-guerriero.vercel.app/questions/"
const ALTERNATIVEQ_ENDPOINT = "https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternativequestion/"

function AlternativeQuestionsIndex() {
    const [questions, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [alternativeQuestions, setAlternativeQuestions] = useState([]);
    const [altsModal, setAltsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [AQ, setAQ] = useState(null);

    const fetchQuestions = useCallback(() => {
        fetch(QUESTION_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            const alternativeQuestions = data.filter((question: any)=> question.type_question === "AQ")
            setQuestions(alternativeQuestions);
            })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect (() => {
        fetchQuestions()
    }, [fetchQuestions])

    const deleteQuestion = (question_id: any) => {
        fetch(`${QUESTION_ENDPOINT}${question_id}/`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.status === 204) {
                setQuestions(questions.filter((question: any) => question.id !== question_id))
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const closeModal = () => {
        console.log("closing modal")
        setModalOpen(false);
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    
    useEffect (() => {
        if (selectedQuestion) {
            console.log("SELECTEDDDDDD",    selectedQuestion)
            if (alternativeQuestions) {
                for (let i = 0; i < alternativeQuestions.length; i++) {
                    if (alternativeQuestions[i].question === selectedQuestion) {
                        console.log("AQ",alternativeQuestions[i].id)
                        setAQ(alternativeQuestions[i].id)
                    }
                }
            }
        }
    }, [selectedQuestion, alternativeQuestions, AQ])



    const fetchAQs = useCallback(() => {
        fetch(ALTERNATIVEQ_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            setAlternativeQuestions(data);
            console.log(data)
            })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect (() => {
        fetchAQs()
    }, [fetchAQs])

    const openPopup = (question_id: any) => {
        console.log("setting question:", question_id)
        setSelectedQuestion(question_id)
        setAltsModal(true);
    }

    const closePopup = () => {
        setAltsModal(false);
    }


    const openEditModal = (question_id: any) => {
        setSelectedQuestion(question_id)
        setShowEditModal(true);
    }

    const closeEditModal = () => {
        setShowEditModal(false);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative overflow-x-auto w-4/5">
                <div className="flex">
                    <div className="w-10/12"></div>

                    <button onClick={() => {toggleModal();}} className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"> + Create Question </button>

                    {modalOpen && (
                         <div className="modal-container">
                            <CreateAQ closeModal={closeModal} fetchQuestions={fetchQuestions()}/>
                        </div>
                    )}
                    
                    </div>
                <table className="w-full text-sm text-left text-gray-800 mt-3 mb-3">
                    <thead className="border-b bg-white font-medium">
                        <tr>
                            <th className="px-6 py-4 text-lg"> Number </th>
                            <th className="px-6 py-4 text-lg"> Question </th>
                            <th className="px-6 py-4 text-lg"> Type </th>
                            <th className="px-6 py-4 text-lg"> Subject </th>
                            <th className="px-6 py-4 text-lg"> Difficulty </th>
                            <th className="px-6 py-4 text-lg"> Alts </th>
                            <th className="px-6 py-4 text-lg"> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                    {questions.map((question: any) => (
                        <tr key={question.id} className="border-b bg-neutral-50 hover:bg-neutral-100">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{question.id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{question.question}</td>
                            <td className="whitespace-nowrap px-6 py-4">{question.type_question}</td>
                            <td className="whitespace-nowrap px-6 py-4 w-0.5">{question.type_subject}</td>
                            <td className="whitespace-nowrap px-6 py-4">{question.difficulty}</td>
                            <td>
                                <button onClick={()=>{openPopup(question.id)}} className="bg-transparent button-pink font-semibold hover:text-white py-1.5 px-2 border border-violet-400 hover:border-transparent rounded mb-1.5 mt-1"> See alternatives </button>
                            </td>
                            <td className="flex">
                                <button> <PencilIcon onClick={() => openEditModal(question.id)} className="h-7 w-7 text gray-400 mt-3 mr-5"/> </button>
                                <button> <TrashIcon onClick={() => deleteQuestion(question.id)} className="h-7 w-7 text-red-600 mt-3"/> </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

               

                {altsModal && (
                    <div className="modal-container">
                        <div className="flex">
                            <GetAlternatives questionId={AQ} closePopup={closePopup}/>
                        </div>
                    </div>
                )}

                {showEditModal && (
                    <div className="modal-container">
                            <div className="flex">
                                <EditQuestion questionId={selectedQuestion} closeEditModal={closeEditModal} aq={AQ}/>
                            </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AlternativeQuestionsIndex;