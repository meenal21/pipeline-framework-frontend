// src/components/PipelineList.jsx
import React from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deletePipeline, fetchPipeline } from "../api"; // Adjust the import path as necessary

const PipelineXList = ({ pipelines }) => {
  const navigate = useNavigate();
  const [pipelineSel, setPipelineSel] = useState(null);

  const goToPipelineXDetails = (id) => {

    navigate(`/pipelinex-detail/${id}`);
  };

  return (
    <Card className="p-3 w-100">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          width: "90%",
          minHeight: "23.5vh", // Adjust height as per design
          overflowY: "auto",
          paddingRight: "16px",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">Saved Pipelines</Card.Title>
          {!pipelines || pipelines.length === 0 ? (
            <p className="text-muted text-center">No pipelines found</p>
          ) : (
            <Table responsive hover size="sm" className="w-100">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Created At</th>
                  <th>Pipeline Name</th>
                </tr>
              </thead>
              <tbody>
                {pipelines.map((pipeline, index) => (
                  <tr key={pipeline.pid || index}>
                    <td>{index + 1}</td>
                    <td>
                      {pipeline.created_at || "12th May"}
                    </td>
                    <td
                      style={{ cursor: "pointer", color: "#0d6efd" }}
                      onClick={() => goToPipelineXDetails(pipeline.pxId)}
                    >
                      {pipeline.name || "Untitled"}
                    </td>
                    {/* <td>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          size="sm"
                          variant="dark"
                          onClick={() => handleRunClick(pipeline)}
                        >
                          View
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
                    </td> */}
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

export default PipelineXList;
