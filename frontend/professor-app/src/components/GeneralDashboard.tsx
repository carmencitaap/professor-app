import React from 'react';
import CheckQuestionsByAns from '../api/Questions/CheckQuestionsByAnswer';
import StudentsAndProgress from '../api/Students/StudentsAndProgress';
import GetBestTask from '../api/Task/GetBestTask';

function GeneralDashboard() {
    return (
        <div>
            <StudentsAndProgress/>
            <CheckQuestionsByAns/>
            <GetBestTask/>
        </div>
    )
}

export default GeneralDashboard;