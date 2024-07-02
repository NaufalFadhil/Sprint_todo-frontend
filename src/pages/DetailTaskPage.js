import React, { useEffect } from 'react';
import { deleteSubtask, getTaskById } from '../utils/network-data'; // Make sure to have an update function in your utils
import { useNavigate, useParams } from 'react-router-dom';
import SubTaskTable from '../components/General/SubTaskTable';

export default function DetailTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subtask, setSubtask] = React.useState([]);

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
      console.log("subtasks", task.data.subtasks);
      setSubtask(task.data.subtasks);

      document.getElementById('editTitle').value = task.data.title;
      document.getElementById('editDescription').value = task.data.description;
      document.getElementById('editStatus').value = task.data.status;
      document.getElementById('editPriority').value = task.data.priority;
      document.getElementById('editDueDate').value = task.data.due_date ? task.data.due_date : '';
    }
  }

  async function onDeleteHandler(id, subId) {
    await deleteSubtask(id, subId);

    const updatedSubtask = subtask.filter(task => task.id !== id);
    setSubtask(updatedSubtask);
    getTaskDetails(id);
  }

  function navigateToAddSubtask() {
    console.log("id ", id);
    navigate(`/${id}/add`);
  }

  return (
    <div className="page-heading">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Detail Task</h4>
          </div>

          <div className="card-body text-start">
            <form>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="inputTitle">Title (readonly)</label>
                    <input type="text" className="form-control" id="editTitle" placeholder="Enter title of task" readOnly />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="inputDescription">Description (readonly)</label>
                    <textarea type="text" className="form-control" id="editDescription" placeholder="Enter description of task" rows={3} readOnly />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <h6>Status (readonly)</h6>
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
                  <h6>Priority (readonly)</h6>
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
                    <label htmlFor="helpInputTop">Due Date (readonly)</label>
                    <input type="date" className="form-control" id="editDueDate" readOnly />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="card-footer">
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary" onClick={navigateToAddSubtask}>Add Sub-task</button>
            </div>
          </div>

          {subtask ? (
            <SubTaskTable taskId={id} tasks={subtask} onDelete={onDeleteHandler} />
          ) : null}
        </div>
      </section>
    </div>
  );
}
