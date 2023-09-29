import React, { useCallback, useEffect, useState } from 'react';

const ALTERNATIVE_ENDPOINT = "https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternative/"

function EditAlternative(props: any) {
    const [isChecked, setIsChecked] = useState(false);
    const [alternative, setAlternative] = useState("");

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    }

    const fetchAlternative = useCallback(() => {
        fetch(`${ALTERNATIVE_ENDPOINT}${props.alternative_id}/`)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setAlternative(data['answer'])
            setIsChecked(data['is_correct'])
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [props.alternative_id])

    useEffect(() => {
        fetchAlternative();
    }, [fetchAlternative])

    const editAlternative = () => {
        fetch(`${ALTERNATIVE_ENDPOINT}${props.alternative_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answer: alternative,
                is_correct: isChecked,
                alternative_question: props.aq
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("Alternative edited")
            props.getAlternatives();
            props.closeEditModal();
        })
        .catch(err => {
            console.log(err.message);
        })
    }
    
    return (
        <div className="rounded overflow-hidden shadow-lg p-6 bg-slate-50 ">
            <div className="flex justify-end">
                <button onClick={()=>props.closeEditModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 r-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <h1 className="text-2xl font-semibold mb-5"> Editing alternative </h1>
            <form className="w-full max-w-sm">
                {/* Alternativas */}
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="alternative">
                            Alternative
                        </label>
                    </div>

                    <div className="md:w-2/3">
                        <input
                        className="bg-gray-50 appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow-lg"
                        id="alternative"
                        type="text"
                        value={alternative}
                        onChange={(e) => setAlternative(e.target.value)}/>
                    </div>
                </div>

                {/* Is correct? */}
                <div className="md:flex md:items-center mb-6 justify-start">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="is_correct">
                            Correct answer?
                        </label>
                    </div>

                    <div className="md:w-1">
                    <input
                    id="is_correct"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                    checked={isChecked}
                    onChange={handleOnChange}
                    />
                    </div>
                </div>

                <button onClick={editAlternative} className="shadow button-pink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Save alternative
                </button>
            </form>
            <button className="text-blue-800 underline mt-1 mb-1 mr-10 ml-10"> Cancel </button>
        </div>
    )
}

export default EditAlternative;