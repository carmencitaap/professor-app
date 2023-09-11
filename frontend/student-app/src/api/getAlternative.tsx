import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

interface Alternative {
  id: number;
  alternative_question: number; //question id fk
  answer: String;
  is_correct: Boolean;
}

const ALTERNATIVE_ENDPOINT = 'https://tsqrmn8j-8000.brs.devtunnels.ms/alternative/';

function GetAlternatives({ questionId }: { questionId: any }) {
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);

  useEffect(() => {
    // Hacer una solicitud GET para obtener todas las alternativas que tienen la clave foránea questionId
    fetch(`${ALTERNATIVE_ENDPOINT}?question=${questionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAlternatives(data);
      })
      .catch((error) => {
        console.error('Error fetching alternatives:', error);
      });
  }, [questionId]);

  return (
    <div>
      <h2>Alternativas de la Pregunta</h2>
      <ul>
        {alternatives.map((alternative) => (
          <li key={alternative.id}>{alternative.answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetAlternatives;