import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import { useMemo, useEffect, useState } from "react";
import "reactflow/dist/style.css";
import { polling } from "../api";

const XDAGGraph = ({dagJson, pxid}) => {
  // Simulating the JSON string
  //const dagJson =
  //  '{"1":{"name":"Transform Action","edges":["2"]},"2":{"name":"Transform Action","edges":[]}}';

  const dag = useMemo(() => JSON.parse(dagJson), []);
  const [someState, setSomeState] = useState(null);
  const getColor = (status) => {
    switch (status) {
      case true: return "lightgreen";
      default: return "white";
    }
  };


  const getColorFail = (status) => {
    switch (status) {
      case true: return "lightgreen";
      default: return "lightred";
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        try {
          const response = await polling(pxid);
          console.log("Polling response:", response);
  
          const progressMap = JSON.parse(response.pipelineProgress); // node statuses
          const statusMap = response.status; // pipeline-level status
          setSomeState(statusMap);
          // Stop polling if pipeline is done
          if (statusMap === "success" || statusMap === "FAILED") {
            clearInterval(interval);
          }
  
          setNodes((prevNodes) =>
            prevNodes.map((node) => {
              const matchedStatus = progressMap?.[node.id];
  
              return {
                ...node,
                data: {
                  ...node.data,
                  status: matchedStatus || node.data.status,
                },
                style: {
                  ...node.style,
                  border: "2px solid",
                  backgroundColor:
                    statusMap === 'FAILED'
                      ? getColorFail(matchedStatus)
                      : getColor(matchedStatus),
                },
              };
            })
          );
        } catch (err) {
          console.error("Polling failed:", err);
        }
      })();
    }, 100);
  
    return () => clearInterval(interval);
  }, []);

  

  const generateFlowData = () => {
    const nodes = Object.entries(dag).map(([id, { name, position }]) => ({
      id,
      data: { label: name },
      position: position || { x: Math.random() * 250, y: Math.random() * 250 },
      draggable: false
      
    }));

    const edges = Object.entries(dag).flatMap(([source, { edges }]) =>
      edges.map((target) => ({
        id: `${source}-${target}`,
        source,
        target: target.toString(),
        markerEnd: {type: "arrowclosed" }
      }))
    );

    return { nodes, edges };
  };

  const { nodes: initialNodes, edges: initialEdges } = generateFlowData();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  return (
    <div style={{ height: "900px" }}>
      <h4 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> Status: {someState}</h4>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodesDraggable
          fitView
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default XDAGGraph;
