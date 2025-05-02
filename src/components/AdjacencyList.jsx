import React, { useState, useEffect } from "react";


const AdjacencyList = ({ nodes, edges, pipeline, pipelineName, onPipelineUpdate }) => {
    const [dag, setDag] = useState({});

    

      const getDependencies = (nodeId, edges) => {
        return edges
          .filter(edge => edge.target === nodeId)
          .map(edge => parseInt(edge.source)); // or just `edge.source` if string IDs
      };


      useEffect(() => {
        let adjList = {};
        nodes.forEach(node => {
          adjList[node.id] = {
            name: node.data.label || `Stage ${node.id}`,
            edges: [],
            position: node.position,
          };
        });
    
        edges.forEach(edge => {
          adjList[edge.source].edges.push(edge.target);
        });
    
        setDag(adjList);
    
        const stages = nodes.map((node) => {
          const nodeId = node.id;
    
          // Step 1: Find parents of the node
          const parents = edges
            .filter(edge => edge.target === nodeId)
            .map(edge => edge.source);
    
          // Step 2: Find grandparents by getting parents of each parent
          const grandparents = parents.flatMap(parentId =>
            edges
              .filter(edge => edge.target === parentId)
              .map(edge => edge.source)
          );
    
          // Step 3: Check if any grandparent has flag: true
          const grandparentHasFlag = grandparents.some(gpId => {
            const gpNode = nodes.find(n => n.id === gpId);
            return gpNode?.data?.flag === true;
          });
    
          return {
            userStageID: Number(nodeId),
            stageName: node.data.label || `Stage ${nodeId}`,
            actionId: node.data.actid || 1,
            nextSidSuccess: adjList[nodeId]?.edges || [],
            nextSidFaliure: [],
            dependencies: getDependencies(nodeId, edges),
            CFlag: grandparentHasFlag ? true : node.data.CFlag || false, // <-- Set CFlag based on grandparent's flag
            payload: node.data.payload || "{}",
            payloadType: node.data.payloadType || "json",
          };
        });
    
        onPipelineUpdate((prev) => ({
          ...prev,
          pName: pipelineName,
          dag: adjList,
          stages: stages
        }));
    }, [nodes, edges, pipelineName]);
    
    
    // useEffect(() => {
    //     let adjList = {};
    //     nodes.forEach(node => {adjList[node.id] = {
          
    //       name: node.data.label || `Stage ${node.id}`,
    //       edges: [],
    //       position: node.position,
    //       };
    //     }); // Initialize adjacency list
    //     edges.forEach(edge => {adjList[edge.source].edges.push(edge.target);});

    //     setDag(adjList);
    //     const stages = nodes.map((node) => ({
    //         userStageID: Number(node.id),
    //         stageName: node.data.label || `Stage ${node.id}`,
    //         actionId: node.data.actid || 1,
    //         nextSidSuccess: dag[node.id]?.edges || [],
    //         nextSidFailure:  [],
    //         dependencies: getDependencies(node.id, edges),
    //         flag: node.data.flag || false,
    //         CFlag: node.data.CFlag || false,
    //         payload: node.data.payload || "{}",
    //         payloadType: node.data.payloadType || "json",
    //       }));
    //       onPipelineUpdate((prev) => ({
    //         ...prev,
    //         pName: pipelineName,
    //         dag: dag,
    //         stages: stages
    //       }));
    // }, [nodes, edges, pipelineName]); // Recompute on graph changes

    return (
        <div style={{ flex: 1, padding: "10px", borderLeft: "1px solid #ddd", overflowY: "auto", height: "80vh" }}>
            
            <pre>{JSON.stringify(pipeline, null, 2)}</pre> {/* Pretty-print JSON */}
            
        </div>
    );
};

export default AdjacencyList;