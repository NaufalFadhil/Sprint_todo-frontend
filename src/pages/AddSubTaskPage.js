import React from 'react'
import { addSubtask, addTask } from '../utils/network-data';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddSubTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function saveTask() {
    const title = document.getElementById('inputTitle').value;
    const description = document.getElementById('inputDescription').value;
    const status = document.getElementById('inputStatus').value;
    const priority = document.getElementById('inputPriority').value;
    const dueDate = document.getElementById('inputDueDate').value;

    if (!title || !description || !status || !priority) {
      alert('Please fill all required fields');
      return;
    }

    const data = {
      title,
      description,
      status,
      priority,
      due_date: dueDate
    } 

    const response = await addSubtask(id, data);
    
    if (response.meta.code === 201) {
      navigate(`/${id}`);
    } else {
      console.log("error", response)
      alert(response.meta.message);
    }
  }

  return (
    <div className="page-heading">
        <section className="section">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Add Sub-Task</h4>
                </div>

                <div className="card-body text-start">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="inputTitle">Title <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="inputTitle" placeholder="Enter title of task" required />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <h6>Status <span className="text-danger">*</span></h6>
                            <fieldset class="form-group">
                                <select class="form-select" id="inputStatus">
                                    <option value={"todo"}>Todo</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="col-md-4">
                            <h6>Priority <span className="text-danger">*</span></h6>
                            <fieldset class="form-group">
                                <select class="form-select" id="inputPriority">
                                  <option value={0}>P0 - Urgent</option>
                                  <option value={1}>P1 - High</option>
                                  <option value={2}>P2 - Normal</option>
                                  <option value={3}>P3 - Low</option>
                                  <option value={4}>P4 - Very Low</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="helpInputTop">Due Date</label>
                                <input type="date" className="form-control" id="inputDueDate" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" onClick={saveTask}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
