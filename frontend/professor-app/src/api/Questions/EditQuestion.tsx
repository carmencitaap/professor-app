import React, { useCallback, useEffect, useState } from 'react';

const QUESTION_ENDPOINT = 'https://pds-p2-g5-avendano-brito-guerriero-virid.vercel.app/questions/';

function EditQuestion(props: any) {
    console.log("flsflkjfkjdsl",props.questionId)
    const [question, setQuestion] = useState([])

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [hint, setHint] = useState("");

    const fetchQuestion = useCallback(() => {
        console.log(props.questionId)
        fetch(`${QUESTION_ENDPOINT}${props.questionId}/`)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setQuestion(data)
            setTitle(data['question'])
            setSubject(data['type_subject'])
            setDifficulty(data['difficulty'])
            setHint(data['hint'])
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [props.questionId])

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion])

    const editQuestion = () => {
        fetch(`${QUESTION_ENDPOINT}${props.questionId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: title,
                type_question: "AQ",
                type_subject: subject,
                difficulty: difficulty,
                hint: hint
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("Question edited")
            props.closeEditModal();
        })
        .catch(err => {
            console.log(err.message);
        })
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="rounded overflow-hidden shadow-xl shadow-indigo-500/40 p-6 bg-slate-50">
               <div className="flex justify-end">
                    <button onClick={()=>props.closeEditModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 r-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <h1 className="text-2xl font-semibold mb-5 px-10"> Editing question #{question['id']} </h1>
                <form className="w-full max-w-sm flex flex-col justify-center items-center">
                    {/* Título pregunta */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="question-title">
                                Question
                            </label>
                        </div>

                        <div className="md:w-2/3">
                            <input
                            className="bg-gray-50 appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow-lg"
                            id="question-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>

                    {/* Materia de la pregunta */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="subject">
                                Subject
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <select
                            id="subject"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 shadow-lg"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}>
                                <option value="">Choose a subject</option>
                                <option value="Resistencias en serie y paralelo">Resistencias serie y paralelo</option>
                                <option value="Kirchhoff - suma tensiones">Kirchhoff - suma tensiones</option>
                                <option value="Kirchhoff - suma corrientes">Kirchhoff - suma corrientes</option>
                                <option value="Tipos de condensadores">Tipos de condensadores</option>
                                <option value="Energia de un condensador">Energia de un condensador</option>
                                <option value="Carga de un condensador">Carga de un condensador</option>
                            </select>
                        </div>
                    </div>

                    {/* Dificultad de la pregunta */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="difficulty">
                                Difficulty
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <select
                            id="difficulty"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 shadow-lg"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}>
                                <option value="">Choose difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Hint pregunta */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="hint">
                                Hint
                            </label>
                        </div>

                        <div className="md:w-2/3">
                            <textarea
                            className="bg-gray-50 appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow-lg"
                            id="hint"
                            value={hint}
                            onChange={(e) => setHint(e.target.value)}/>
                        </div>
                    </div>

                    <div className="md:flex md:items-center">
                        <div className="md:w-16"></div>
                        <div className="flex flex-col">
                            <button onClick={() => editQuestion()} className="shadow button-pink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded mr-10" type="button">
                                Save Question
                            </button>
                        </div>
                    </div>
                </form>
                
                <button onClick={props.closeEditModal} className="text-blue-800 underline mt-1 mb-1 mr-10 ml-10"> 
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditQuestion;