import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPipelineX } from "../api"; // Adjust the import path as necessary
import XDAGGraph from "../components/PipelineXDAG";


const PipelineDetails = () => {
  const { id } = useParams(); // Fetch pipeline ID from URL
  const [pipeline, setPipeline] = useState(null);
  
  useEffect(() => {
     fetchPipelineX(parseInt(id))
           .then((response) => {
             console.log("PipelineX data:", response);
             console.log("PipelineX DAG:", response.dag);
             if (response) {
               setPipeline(response);
             } else {
               alert("Error: PipelineX data not found");
             }
           })
           .catch((error) => {
             console.error("Error loading pipelineX:", error);
             alert("Error loading pipelineX");
           });
   }, [id]);

  return (
    <div style={{ paddingTop: '20px' }}>

      {/* {pipeline ? (
        <pre>{JSON.stringify(pipeline, null, 2)}</pre> // Render as JSON
      ) : (
        <p>No pipeline found with ID {id}</p>
      )} */}
      {pipeline ? (
        <div>
          <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Pipeline: {pipeline.name}</h3>
          <h4 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> Status: {pipeline.status}</h4>
          <XDAGGraph dagJson={pipeline.dag} pxid = {id} />
        </div>
      ) : (
        <p>No pipeline found with ID {id}</p>
      )}
    </div>
  );
};

export default PipelineDetails;