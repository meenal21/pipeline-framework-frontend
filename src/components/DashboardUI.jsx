import React from "react";
import '../css/Dashboard.css';

const DashboardUI = ({
  userInfo,
  pipelines,
  currentPipeline,
  handleCreatePipeline,
  handleExecutePipeline,
  handlePipelineCreated,
}) => {
  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <div className="user-info">
          <h3>User Info</h3>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p> </p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          {/* <p><strong>Role:</strong> {userInfo.role}</p> */}
        </div>
      </div>
      <div className="main-content">
        <div className="create-pipeline">
          <h3>Create Pipeline</h3>
          <button onClick={handleCreatePipeline}>Create New Pipeline</button>
        </div>
        <div className="execute-pipeline">
          <h3>Execute Pipeline</h3>
          {pipelines.length > 0 ? (
            <ul>
              {pipelines.map((pipeline, index) => (
                <li key={index}>
                  <p>{pipeline.name}</p>
                  <button onClick={() => handleExecutePipeline(pipeline)}>
                    Execute Pipeline
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pipelines created yet.</p>
          )}
        </div>
        <div className="workflow">
          <h3>Workflow</h3>
          <p>Workflow details go here.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardUI;