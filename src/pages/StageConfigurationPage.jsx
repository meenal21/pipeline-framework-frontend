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
    console.log("Updated pipeline:", pipeline);
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

                const payloadType = stage.payloadType || {};

                return Object.entries(parsedPayload).map(([key, value]) => {
                  const typeInfo = payloadType[key] || { type: "string" };
                  const htmlInputType =
                    typeInfo.type === "int" || typeInfo.type === "float" ? "number" : "text";
                  const isFileInput = key.toLowerCase().includes("file");
                  const isBoolean = typeInfo.type === "boolean";

                  return (
                    <Form.Group className="mb-2" key={key}>
                      <Form.Label>{key}</Form.Label>
                      {isFileInput && typeInfo.type === "string"? (
                        <Form.Control
                          type="file"
                          multiple={typeInfo.isArray} // allow multiple files if it's an array
                          onChange={(e) => {
                            const fileList = Array.from(e.target.files);
                            const fileNames = fileList.map((f) => f.name);

                            // If it's an array, store multiple filenames; if not, store a single filename
                            const updatedPayload = {
                              ...parsedPayload,
                              [key]: typeInfo.isArray ? fileNames : fileNames[0] || "",
                            };

                            handleStageChange(idx, "payload", JSON.stringify(updatedPayload, null, 2));
                          }}
                        />
                      ) : isBoolean ? (
                        <Form.Check
                          type="switch"
                          id={`custom-switch-${key}`}
                          label={value ? "True" : "False"}
                          checked={value}
                          onChange={(e) => {
                            const updatedPayload = {
                              ...parsedPayload,
                              [key]: e.target.checked,
                            };
                            handleStageChange(idx, "payload", JSON.stringify(updatedPayload, null, 2));
                          }}
                        />
                      ) : (
                        <Form.Control
                          type={htmlInputType}
                          value={value}
                          onChange={(e) => {
                            let newValue = e.target.value;

                            // Input validation based on type
                            switch (typeInfo.type) {
                              case "int":
                                // Allow only numeric characters (integer)
                                if (!/^\d*$/.test(newValue)) {
                                  return; // Prevent entering non-numeric values
                                }
                                newValue = newValue === "" ? null : parseInt(newValue, 10);
                                break;
                              case "float":
                                // Allow only numbers and decimal points (float)
                                if (!/^\d*\.?\d*$/.test(newValue)) {
                                  return; // Prevent entering non-numeric or invalid float values
                                }
                                newValue = newValue === "" ? null : parseFloat(newValue);
                                break;
                              case "boolean":
                                // Allow only "true" or "false" (boolean values)
                                if (newValue !== "true" && newValue !== "false") {
                                  return; // Prevent entering any value other than "true" or "false"
                                }
                                newValue = newValue === "true";
                                break;
                              case "string":
                              default:
                                // For strings, allow any input
                                newValue = String(newValue);
                            }

                            const updatedPayload = { ...parsedPayload, [key]: newValue };
                            handleStageChange(idx, "payload", JSON.stringify(updatedPayload, null, 2));
                          }}
                        />
                      )}
                    </Form.Group>
                  );
                });
              })()}
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
