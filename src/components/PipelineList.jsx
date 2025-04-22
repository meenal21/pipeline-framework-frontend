// src/components/PipelineList.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { getPipelines } from "../utils/pipelineStorage";
import { useNavigate } from "react-router-dom";


const PipelineList = () => {
  const [pipelines, setPipelines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getPipelines();
    setPipelines(stored);
  }, []);

  const goToPipelineDetails = (id) => {
    navigate(`/pipeline-detail/${id}`);
  };


  const handleRunClick = (pipeline) => {
    // Placeholder for running logic
    console.log("Run clicked for:", pipeline.pName);
    alert(`Running pipeline: ${pipeline.pName}`);
  };

  return (
        <Card className="p-3 w-100">
            <Container className="d-flex justify-content-center align-items-center">
          <Card.Body>
            <Card.Title className="text-center mb-4">Saved Pipelines</Card.Title>
            {pipelines.length === 0 ? (
              <p className="text-muted text-center">No pipelines found</p>
            ) : (
              <Table responsive  hover size="sm" className="w-100">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pipeline Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pipelines.map((pipeline, index) => (
                    <tr key={pipeline.id || index}>
                      <td>{index + 1}</td>
                      <td
                        style={{ cursor: "pointer", color: "#0d6efd" }}
                        onClick={() => goToPipelineDetails(pipeline.id)}
                      >
                        {pipeline.pName || "Untitled"}
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="dark"
                          onClick={() => handleRunClick(pipeline)}
                        >
                          Run
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
          </Container>
        </Card> 

        );
};

export default PipelineList;
