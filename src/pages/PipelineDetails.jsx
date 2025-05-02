import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPipeline } from "../api"; // Adjust the import path as necessary
import PipelineDAG from "../components/FlowChart"; // Adjust the import path as necessary

const PipelineDetails = () => {
  const { id } = useParams(); // Fetch pipeline ID from URL
  const [pipeline, setPipeline] = useState(null);
  
  useEffect(() => {
    fetchPipeline(parseInt(id))
          .then((response) => {
            console.log("Pipeline data:", response);
            if (response) {
              setPipeline(response);
            } else {
              alert("Error: Pipeline data not found");
            }
          })
          .catch((error) => {
            console.error("Error loading pipeline:", error);
            alert("Error loading pipeline");
          });
  }, [id]);

  return (
    <div>
      <h4>Pipeline Configuration</h4>
      {pipeline ? (
        <div>
        <pre>{JSON.stringify(pipeline, null, 2)}</pre> // Render as JSON
        <PipelineDAG />
        </div>
      ) : (
        <p>No pipeline found with ID {id}</p>
      )}
    </div>
  );
};

export default PipelineDetails;