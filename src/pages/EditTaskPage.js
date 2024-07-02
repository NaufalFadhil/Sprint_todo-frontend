import React, { useEffect } from 'react';
import { getTaskById, updateTaskById } from '../utils/network-data'; // Make sure to have an update function in your utils
import { useParams } from 'react-router-dom';

export default function EditTask() {
  const { id } = useParams();

  useEffect(() => {
    getTaskDetails(id);
  }, [id]);

  async function getTaskDetails(id) {
    const task = await getTaskById(id);

    console.log("task", task.data);
    if (task.meta.code !== 200) {
      alert(task.meta.message);
      return;
    } else {
      document.getElementById('editTitle').value = task.data.title;
      document.getElementById('editDescription').value = task.data.description;
      document.getElementById('editStatus').value = task.data.status;
      document.getElementById('editPriority').value = task.data.priority;
      document.getElementById('editDueDate').value = task.data.due_date ? task.data.due_date : '';
    }
  }

  async function handleUpdateTask(event) {
    event.preventDefault(); // Prevent form submission default behavior

    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const status = document.getElementById('editStatus').value;
    const priority = document.getElementById('editPriority').value;
    const dueDate = document.getElementById('editDueDate').value;

    if (!title || !description || !status || !priority) {
      alert('Please fill all required fields');
      return;
    }

    const priorityNumber = parseInt(priority.replace('P', ''));

    const task = {
      title,
      description,
      status,
      priority: priorityNumber.toString(),
      due_date: dueDate
    };

    const response = await updateTaskById(id, task);

    if (response.meta.code === 200) {
      window.location.href = '/';
    } else {
      alert(response.meta.message);
    }
  }

  return (
    <div className="page-heading">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Edit Task</h4>
          </div>

          <div className="card-body text-start">
            <form onSubmit={handleUpdateTask}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="inputTitle">Title <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="editTitle" placeholder="Enter title of task" required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="inputDescription">Description <span className="text-danger">*</span></label>
                    <textarea type="text" className="form-control" id="editDescription" placeholder="Enter description of task" rows={3} required />
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
                    <button type="submit" className="btn btn-primary">Save</button>
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
