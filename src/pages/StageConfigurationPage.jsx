import React, { useEffect, useState } from "react";
import { Card, Form, Button, Accordion } from "react-bootstrap";

const StageConfigurationPage = () => {
  const [pipeline, setPipeline] = useState(null);

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
    console.log("Final pipeline:", pipeline);
    localStorage.setItem("configuredPipeline", JSON.stringify(pipeline));
    alert("Pipeline saved!");
  };

  if (!pipeline) return <div>Loading pipeline...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Configure Stages for: {pipeline.pName}</h2>
      <Accordion defaultActiveKey="0">
        {pipeline.stages.map((stage, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={stage.userStageID}>
            <Accordion.Header>Stage {stage.userStageID}: {stage.stageName}</Accordion.Header>
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
                  <Form.Label>Payload (JSON)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={stage.payload}
                    onChange={(e) =>
                      handleStageChange(idx, "payload", e.target.value)
                    }
                  />
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
        <Button variant="dark" onClick={handleSave}>Save Configuration</Button>
      </div>
    </div>
  );
};

export default StageConfigurationPage;

