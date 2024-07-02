import React, { useEffect } from 'react';
import { getSubtaskById, updateTaskById } from '../utils/network-data'; // Make sure to have an update function in your utils
import { useNavigate, useParams } from 'react-router-dom';

export default function EditSubTaskPage() {
  const { id, subId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSubTaskDetails(id, subId);
  }, [id, subId]);

  async function getSubTaskDetails(id, subId) {
    const task = await getSubtaskById(id, subId);

    console.log("task", task.data);
    if (task.meta.code !== 200) {
      alert(task.meta.message);
      return;
    } else {
      document.getElementById('editTitle').value = task.data.title;
      document.getElementById('editStatus').value = task.data.status;
      document.getElementById('editPriority').value = task.data.priority;
      document.getElementById('editDueDate').value = task.data.due_date ? task.data.due_date : '';
    }
  }

  async function handleUpdateSubTask(event) {
    event.preventDefault();

    const title = document.getElementById('editTitle').value;
    const status = document.getElementById('editStatus').value;
    const priority = document.getElementById('editPriority').value;
    const dueDate = document.getElementById('editDueDate').value;

    if (!title || !status || !priority) {
      alert('Please fill all required fields');
      return;
    }

    const priorityNumber = parseInt(priority.replace('P', ''));

    const subtask = {
      title,
      status,
      priority: priorityNumber.toString(),
      due_date: dueDate
    };

    const response = await updateTaskById(id, subtask);

    if (response.meta.code === 200) {
      navigate('/');
    } else {
      alert(response.meta.message);
    }
  }

  return (
    <div className="page-heading">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Edit Sub-task</h4>
          </div>

          <div className="card-body text-start">
            <form onSubmit={handleUpdateSubTask}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="inputTitle">Title <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="editTitle" placeholder="Enter title of task" required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <h6>Status <span className="text-danger">*</span></h6>
                  <fieldset className="form-group">
                    <select className="form-select" id="editStatus">
                      <option value={"todo"}>Todo</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <h6>Priority <span className="text-danger">*</span></h6>
                  <fieldset className="form-group">
                    <select className="form-select" id="editPriority">
                      <option value="P0">P0 - Critical</option>
                      <option value="P1">P1 - High</option>
                      <option value="P2">P2 - Normal</option>
                      <option value="P3">P3 - Low</option>
                      <option value="P4">P4 - Very Low</option>
                    </select>
                  </fieldset>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="helpInputTop">Due Date</label>
                    <input type="date" className="form-control" id="editDueDate" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">Update Subtask</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
