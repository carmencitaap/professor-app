import React from 'react';
import CheckQuestionsByAns from '../api/Questions/CheckQuestionsByAnswer';
import StudentsAndProgress from '../api/Students/StudentsAndProgress';
// import ExceptionalQuestion from '../api/Questions/ExceptionalQuestion';

function GeneralDashboard() {
    return (
        <div>
            <StudentsAndProgress/>
            <CheckQuestionsByAns/>
            {/* <ExceptionalQuestion/> */}
        </div>
    )
}

export default GeneralDashboard;