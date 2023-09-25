import React from 'react';
import CheckQuestionsByAns from '../api/Questions/CheckQuestionsByAnswer';
import StudentsAndProgress from '../api/Students/StudentsAndProgress';

function GeneralDashboard() {
    return (
        <div>
            <StudentsAndProgress/>
            <CheckQuestionsByAns/>
        </div>
    )
}

export default GeneralDashboard;