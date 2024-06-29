import React, { useEffect, useState } from 'react'
import { getCanceledTask, getCompletedTask, getOngoingTask, getTodoTask } from '../utils/network-data';
import TaskTable from '../components/General/TaskTable';

export default function Task({status}) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('Todo');

    useEffect(() => {
        switch (status) {
            case 'ongoing':
                setTitle('Ongoing');
                getOngoingTask().then(response => {
                    setTasks(response.data);
                });
                break;
            case 'completed':
                setTitle('Completed');
                getCompletedTask().then(response => {
                    setTasks(response.data);
                });
                break;
            case 'canceled':
                setTitle('Canceled');
                getCanceledTask().then(response => {
                    setTasks(response.data);
                });
                break;
            default:
                setTitle('Todo');
                getTodoTask().then(response => {
                    setTasks(response.data);
                });
                break;
        }
    }, [status]);

    return (
        <div>
            <div className="content-wrapper container">
                <div className="page-heading">
                    <h3>{title} Task</h3>
                </div>
                
                <TaskTable tasks={tasks} />
            </div>
        </div>
    )
}
