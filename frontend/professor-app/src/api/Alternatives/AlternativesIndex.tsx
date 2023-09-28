import { CheckIcon, PencilIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import React, { useState, useEffect, useCallback } from 'react';
import CreateAlternatives from './NewAlternatives';
import EditAlternative from './EditAlternative';

const ALTERNATIVE_ENDPOINT = "https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternative/"

function GetAlternatives(props: any) {
    const [alternatives, setAlternatives] = useState([]);
    const [altModalOpen, setAltModalOpen] = useState(false);
    const [editAltModalOpen, setEditAltModalOpen] = useState(false);
    const [selectedAlternative, setSelectedAlternative] = useState({});

    console.log("altq qqqqqqqqqq", props.questionId)

    const fetchAlternatives = useCallback(() => {
        fetch(ALTERNATIVE_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            const alts = data.filter((alternative: any)=> alternative.alternative_question === props.questionId)
            setAlternatives(alts);
            console.log("AAAAAAAAAAAAA" ,data)
            }
        )
            .catch((err) => {
                console.log(err.message)
            }
        )
        },[props.questionId] )
    
    useEffect (() => {
        fetchAlternatives()
    }, [fetchAlternatives])

    const deleteAlternative = (alternative_id: any) => {
        fetch(`${ALTERNATIVE_ENDPOINT}${alternative_id}/`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.status === 204) {
                setAlternatives(alternatives.filter((alternative: any) => alternative.id !== alternative_id))
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
    
    const openAltModal = (question_id: any) => {
        setAltModalOpen(true);
        // setSelectedQuestion(question_id)
    }

    const closeAltModal = () => {
        setAltModalOpen(false);
    }

    const openEditModal = (alternative_id) => {
        setEditAltModalOpen(true);
        setSelectedAlternative(alternative_id)
    }

    const closeEditModal = () => {
        setEditAltModalOpen(false);
    }
    
    return (
        <div>
            <div className="rounded overflow-hidden shadow-lg p-6 bg-slate-50 ">
                <div className="flex justify-end">
                    <button onClick={()=>props.closePopup()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 r-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                
                <button onClick={() => {openAltModal(props.aq)}} > + Add alternative </button>
                <h1 className="text-3xl font-bold py-2 pb-2">Alternatives for question #{props.questionId}</h1>
                <div className="flex justify-center items-center">
                    <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-3 mb-3">
                        <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                                <th className="px-6 py-4 text-lg"> Answer </th>
                                <th className="px-6 py-4 text-lg"> Correct </th>
                                <th className="px-6 py-4 text-lg"> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {alternatives.map((alt: any) => (
                                <tr  className="border-b bg-neutral-50 hover:bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" key={alt.id}>
                                    <td className="whitespace-nowrap px-3 py-2 font-medium">{alt.answer}</td>
                                    <td>  {alt.is_correct ?
                                        <CheckIcon className="h-4 w-4 text-green-500 ml-12"/>
                                    :
                                        <XIcon className="h-4 w-4 text-red-600 ml-12"/>}
                                    </td>

                                    <td className="flex mt-1 mb-1">
                                        <button> <PencilIcon onClick={() => {openEditModal(alt.id)}} className="h-5 w-5 text gray-400 ml-7"/> </button>
                                        <button onClick={() => deleteAlternative(alt.id)}> <TrashIcon className="h-5 w-5 text-red-600 ml-2"/> </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {altModalOpen && (
                    <div className="modal-container">
                        <div className="flex">
                             <div>
                                <CreateAlternatives questionId={props.questionId} closeAltModal={closeAltModal}/>
                            </div>
                        </div>
                    </div>
                )}

                 
                {editAltModalOpen && (
                    <div className="modal-container">
                        <div className="flex">
                             <div>
                                <EditAlternative closeEditModal={closeEditModal} alternative_id={selectedAlternative} aq={props.questionId} getAlternatives={fetchAlternatives()}/>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
                
        </div>
    )
}

export default GetAlternatives;



