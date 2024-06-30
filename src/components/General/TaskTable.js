import React from 'react'
import PriorityBadge from './PriorityBadge'

export default function TaskTable({tasks, onDelete}) {

  return (
    <div className="page-content">
        <section className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover table-lg">
                                <tbody>
                                    {tasks.length ? tasks.map(task => (
                                        <tr key={task.id}>
                                            <td className="col-6">
                                                <div className="d-flex align-items-center">
                                                    <PriorityBadge priority={task.priority} />
                                                    <p className="font-bold ms-3 mb-0">{task.title}</p>
                                                </div>
                                            </td>
                                            <td className="col-2">
                                                <div className="d-flex align-items-center">
                                                    <p className="ms-3 mb-0">{task.due_date ? task.due_date : 'No Due Date'}</p>
                                                </div>
                                            </td>
                                            <td className="col-3">
                                                <div className="d-flex align-items-center justify-content-end">
                                                    <button className="btn btn-sm btn-outline-primary">View & Edit</button>
                                                    <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => onDelete(task.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="3" className="text-center">No Task Available</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
