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
      dag: JSON.stringify(pipeline.dag)
    };
    pipelineToSave.stages.forEach(stage => {
      delete stage["payloadType"];
    });
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
        {pipeline.stages.map((stage, idx) => {
          const parsedPayload =
            typeof stage.payload === "string"
              ? JSON.parse(stage.payload || "{}")
              : stage.payload || {};
          
          const payloadType = stage["payloadType"] || {};
          console.log("Parsed payload ----", payloadType);

          const handleInputChange = (key, value) => {
            const updatedPayload = {
              ...parsedPayload,
              [key]: value,
            };
            handleStageChange(idx, "payload", JSON.stringify(updatedPayload, null, 2));
          };

          return (
            <Accordion.Item eventKey={idx.toString()} key={stage.userStageID}>
              <Accordion.Header>
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
                    <Form.Label>Payload</Form.Label>
                    {Object.entries(parsedPayload).map(([key, value]) => {
                      const typeInfo = payloadType[key] || { type: "string" };
                      console.log("payloadType", payloadType[key])
                      const htmlInputType =
                        typeInfo.type === "int" || typeInfo.type === "float"
                          ? "number"
                          : "text";
                      const isFileInput = key.toLowerCase().includes("file");
                      const isBoolean = typeInfo.type === "boolean";
                      const isOutput = key.toLowerCase().includes("output");

                      return (
                        <Form.Group className="mb-2" key={key}>
                          <Form.Label>{key}</Form.Label>

                          {isBoolean ? (
                            <Form.Check
                              type="switch"
                              checked={value === true}
                              onChange={(e) =>
                                handleInputChange(key, e.target.checked)
                              }
                              label={value ? "True" : "False"}
                            />
                          ) : isFileInput && typeInfo.type === "string" && !isOutput? (
                            <Form.Control
                              type="file"
                              multiple={typeInfo.isArray}
                              onChange={(e) => {
                                const fileList = Array.from(e.target.files);
                                const fileNames = fileList.map((f) => f.name);
                                handleInputChange(
                                  key,
                                  typeInfo.isArray
                                    ? fileNames
                                    : fileNames[0] || ""
                                );
                              }}
                            />
                          ) : (
                            <Form.Control
                              type={htmlInputType}
                              value={value}
                              onChange={(e) => {
                                let val = e.target.value;
                                if (typeInfo.type === "int") val = parseInt(val) || 0;
                                else if (typeInfo.type === "float") val = parseFloat(val) || 0.0;
                                handleInputChange(key, val);
                              }}
                            />
                          )}
                        </Form.Group>
                      );
                    })}
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
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
