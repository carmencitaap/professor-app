import React from "react";
import { useParams } from 'react-router-dom';

interface Task {
    id: number;
    questions: [];
    name: String;
    description: String;
    type_task: String;
    state: String;
    xp_in_task: number;
    difficulty: String;
    wrong_answer: [];

}

// https://tsqrmn8j-8000.brs.devtunnels.ms/students/