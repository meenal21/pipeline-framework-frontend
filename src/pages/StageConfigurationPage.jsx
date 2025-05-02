import React, { useEffect, useState } from "react";
import { Card, Form, Button, Accordion } from "react-bootstrap";
import { savePipeline } from "../api";
import { useNavigate } from "react-router-dom";

const StageConfigurationPage = () => {
  const [pipeline, setPipeline] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("pipeline");
    if (stored) {
      setPipeline(JSON.parse(stored));
    }
  }, []);

  const handleStageChange = (index, field, value) => {
    setPipeline((prev) => {
      const updatedStages = [...prev.stages];
      updatedStages[index][field] = value;
      return { ...prev, stages: updatedStages };
    });
  };

  const handleSave = () => {
    const pipelineToSave = {
      ...pipeline,
      dag: JSON.stringify(pipeline.dag) // Convert DAG to string
    };
    
    console.log("Final pipeline:", pipelineToSave);
    localStorage.setItem("configuredPipeline", JSON.stringify(pipelineToSave));
    
    savePipeline(pipelineToSave)
      .then((response) => {
        console.log("Pipeline saved successfully:", response);
        alert("Pipeline saved!");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error saving pipeline:", error);
        alert("Error saving pipeline");
      });  
  };

  if (!pipeline) return <div>Loading pipeline...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Configure Stages for: {pipeline.pName}</h2>
      <Accordion defaultActiveKey="0">
        {pipeline.stages.map((stage, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={stage.userStageID}>
            <Accordion.Header variant="dark">
              Stage {stage.userStageID}: {stage.stageName}
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Stage Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={stage.stageName}
                    onChange={(e) =>
                      handleStageChange(idx, "stageName", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Action ID</Form.Label>
                  <Form.Control
                    type="number"
                    value={stage.actionId}
                    onChange={(e) =>
                      handleStageChange(idx, "actionId", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payload (Dynamic Inputs)</Form.Label>
                  {(() => {
                    let parsedPayload = {};
                    try {
                      if (typeof stage.payload === "string") {
                        parsedPayload = JSON.parse(stage.payload);
                      } else if (typeof stage.payload === "object" && stage.payload !== null) {
                        parsedPayload = stage.payload;
                      }
                    } catch (e) {
                      console.error("Invalid JSON in payload:", stage.payload);
                    }

                    return Object.entries(parsedPayload).map(([key, value]) => (
                      <Form.Group className="mb-2" key={key}>
                        <Form.Label>{key}</Form.Label>
                        <Form.Control
                          type="text"
                          value={value}
                          onChange={(e) => {
                            const updatedPayload = { ...parsedPayload, [key]: e.target.value };
                            handleStageChange(idx, "payload", JSON.stringify(updatedPayload, null, 2));
                          }}
                        />
                      </Form.Group>
                    ));
                  })()}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="CFlag (Custom Flag)"
                    checked={stage.CFlag}
                    onChange={(e) =>
                      handleStageChange(idx, "CFlag", e.target.checked)
                    }
                  />
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <div className="mt-4">
        <Button variant="dark" onClick={handleSave}>
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default StageConfigurationPage;
