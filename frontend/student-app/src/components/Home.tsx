import React from 'react';

import CreateTask from '../api/createTask';

function Home() {
    return (
        <div>
            <div className="flex flex-col justify-center">
                <a href='/creatingtask' className='text-7xl font-bold'> Solicitar tarea </a>
            </div>
        </div>
    )
}

export default Home;
