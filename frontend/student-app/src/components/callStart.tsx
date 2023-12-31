import React, { useEffect, useState } from 'react';

const TASK_ENDPOINT =  'https://tsqrmn8j-8000.brs.devtunnels.ms/tasks/'


function StartTaskFB({ taskId }: { taskId: any }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startTask() {
      try {
        const response = await fetch(TASK_ENDPOINT+taskId+'/start_task/', {
          method: 'POST',
        });

        if (response.ok) {
          setLoading(false);
          console.log('Task started successfully');
        } else {
          console.error('Error starting task:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error starting task:', error);
        setLoading(false);
      }
    }

    startTask();
  }, [taskId]);

  if (loading) {
    return <div>Starting task...</div>;
  }

  return <div>Task started successfully!</div>;
}

export default StartTaskFB;
