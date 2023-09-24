import React, { useState, useEffect, useCallback } from 'react';

const ALTERNATIVE_ENDPOINT = "https://pds-p2-g5-avendano-brito-guerriero.vercel.app/alternative/"

function GetAlternatives(props: any) {
    const [alternatives, setAlternatives] = useState([]);
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

                
                <h1 className="text-3xl font-bold py-2 pb-2">Alternatives for question #{props.questionId}</h1>
                <div>
                {alternatives.map((alt: any) => (
                    <div key={alt.id}>
                        <p className="text-lg font-semibold">{alt.answer} {alt.is_correct ? "Correct Answer" : "Incorrect Answer"}</p>
                    </div>
                ))}
                </div>
            </div>
                
        </div>
    )
}

export default GetAlternatives;



