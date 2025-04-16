import React, { useState, useEffect } from "react";


const AdjacencyList = ({ nodes, edges }) => {
    const [dag, setDag] = useState({});

    const [pipeline, setPipeline] = useState({
        userId: 1,
        pName: "MyPipeline",
        dag: {},
        stages: []
      });

      const getDependencies = (nodeId, edges) => {
        return edges
          .filter(edge => edge.target === nodeId)
          .map(edge => parseInt(edge.source)); // or just `edge.source` if string IDs
      };
    useEffect(() => {
        let adjList = {};
        nodes.forEach(node => adjList[node.id] = []); // Initialize adjacency list
        edges.forEach(edge => adjList[edge.source].push(edge.target));
        setDag(adjList);
        const stages = nodes.map((node) => ({
            userStageID: Number(node.id),
            stageName: node.data.label || `Stage ${node.id}`,
            actionId: node.data.actionId || 1,
            nextSidSuccess: dag[node.id] || [],
            dependencies: getDependencies(node.id, edges),
            CFlag: node.data.CFlag || false,
            payload: node.data.payload || "{}"
          }));
          setPipeline((prev) => ({
            ...prev,
            dag: dag,
            stages: stages
          }));
    }, [nodes, edges]); // Recompute on graph changes

    return (
        <div style={{ flex: 1, padding: "10px", borderLeft: "1px solid #ddd", overflowY: "auto", height: "85vh" }}>
            
            <pre>{JSON.stringify(pipeline, null, 2)}</pre> {/* Pretty-print JSON */}
        </div>
    );
};

export default AdjacencyList;