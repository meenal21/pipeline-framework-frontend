// src/components/PipelineList.jsx
import React from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deletePipeline, runPipeline} from "../api"; // Adjust the import path as necessary

const PipelineList = ({ pipelines }) => {
  const navigate = useNavigate();

  const goToPipelineDetails = (id) => {

    navigate(`/pipeline-detail/${id}`);
  };

  const handleRunClick = (pipeline) => {
    runPipeline(pipeline.pid)
      .then((response) => {
        console.log("Run Response", response);
        if (response) {
          navigate(`/pipelinex-detail/${response.pxid}`);
        } else {
          alert("Error: Pipeline data not found");
        }
      })
      .catch((error) => {
        console.error("Error loading pipeline:", error);
        alert("Error loading pipeline");
      });
  };

const handleDeleteClick = (pipeline) => {
    // Placeholder for delete logic

    deletePipeline(parseInt(pipeline.pid))
      .then((response) => { 
        console.log("Pipeline deleted successfully:", response);
        if(response.success === true) {
        window.location.reload();
        }
        else {
          alert("Error deleting pipeline");
        }
        // Optionally, refresh the pipeline list or remove the deleted pipeline from state
      })
      .catch((error) => {
        console.error("Error deleting pipeline:", error);
        alert("Error deleting pipeline");
      });
    console.log("Delete clicked for:", pipeline.pname);
  }

  return (
    <Card className="p-3 w-100">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          width: "90%",
          minHeight: "23.5vh",
          paddingRight: "8px",
        }}
      >
        <Card.Body >
          <Card.Title className="text-center mb-4">Saved Pipelines</Card.Title>
          {!pipelines || pipelines.length === 0 ? (
            <p className="text-muted text-center">No pipelines found</p>
          ) : (
            <div style={{ maxHeight: "16vh", overflowY: "auto" }}>
            <Table responsive hover size="sm" className="w-100" style={{ overflow: "auto" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pipeline Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pipelines.map((pipeline, index) => (
                  <tr key={pipeline.pid || index}>
                    <td>{index + 1}</td>
                    <td
                      style={{ cursor: "pointer", color: "#0d6efd" }}
                      onClick={() => goToPipelineDetails(pipeline.pid)}
                    >
                      {pipeline.pname || "Untitled"}
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          size="sm"
                          variant="dark"
                          onClick={() => handleRunClick(pipeline)}
                        >
                          Run
                        </Button>
                        <span className="text-muted">/</span>
                        <Button
                          size="sm"
                          variant="dark"
                          onClick={() => handleDeleteClick(pipeline)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
          )}
        </Card.Body>
      </Container>
    </Card>
  );
};

export default PipelineList;
