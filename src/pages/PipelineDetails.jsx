import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPipelines } from "../utils/pipelineStorage";

const PipelineDetails = () => {
  const { id } = useParams(); // Fetch pipeline ID from URL
  const [pipeline, setPipeline] = useState(null);

  useEffect(() => {
    const stored = getPipelines(); 
    console.log(stored) // Get the list of pipelines
    const selectedPipeline = stored.find((pipe) => pipe.id === id); // Find pipeline by ID
    setPipeline(selectedPipeline); // Store it in the state
  }, [id]);

  return (
    <div>
      <h4>Pipeline Configuration</h4>
      {pipeline ? (
        <pre>{JSON.stringify(pipeline, null, 2)}</pre> // Render as JSON
      ) : (
        <p>No pipeline found with ID {id}</p>
      )}
    </div>
  );
};

export default PipelineDetails;