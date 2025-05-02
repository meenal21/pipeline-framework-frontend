import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

const generateFlowchartFromPipeline = (pipeline) => {
  const nodes = pipeline.stages.map((stage, index) => ({
    id: stage.userStageID.toString(),
    type: "default",
    data: {
      label: `${stage.stageName} (Status: ${stage.status || "idle"})`,
    },
    position: { x: 250, y: index * 120 },
  }));

  const edges = Object.entries(pipeline.dag).flatMap(([from, toList]) =>
    toList.map((to) => ({
      id: `e${from}-${to}`,
      source: from,
      target: to,
      animated: true,
    }))
  );

  return { nodes, edges };
};

const ViewDAG = () => {
  const { id } = useParams();
  const [pipeline, setPipeline] = useState(null);

  useEffect(() => {
    const pipelines = JSON.parse(localStorage.getItem("pipelines")) || [];
    const found = pipelines.find((p) => p.id === id);

    if (found) {
      const enrichedStages = found.stages.map((s) => ({
        ...s,
        status: s.status || "idle",
      }));

      setPipeline({
        ...found,
        stages: enrichedStages,
      });
    }
  }, [id]);

  const { nodes, edges } = useMemo(() => {
    if (pipeline) {
      return generateFlowchartFromPipeline(pipeline);
    }
    return { nodes: [], edges: [] };
  }, [pipeline]);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};

export default ViewDAG;
