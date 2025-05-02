import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
  } from "reactflow";
  import { useMemo } from "react";
  
  const DAGGraph = ({dagJson}) => {
    const dag = useMemo(() => {
        try {
            return typeof dagJson === 'string' ? JSON.parse(dagJson) : dagJson;
        } catch (error) {
            console.error('Failed to parse DAG JSON:', error);
            return {};
        }
    }, [dagJson]);
    
    const generateFlowData = () => {
        const nodes = [];
        const edges = [];
        
        try {
            Object.entries(dag).forEach(([nodeId, nodeData]) => {
                if (nodeData && typeof nodeData === 'object') {
                    // Add node
                    nodes.push({
                        id: nodeId,
                        data: { label: nodeData.name || nodeId },
                        position: nodeData.position || { 
                            x: Math.random() * 500, 
                            y: Math.random() * 300 
                        }
                    });
                    
                    // Add edges if dependencies exist
                    if (Array.isArray(nodeData.dependencies)) {
                        nodeData.dependencies.forEach(targetId => {
                            edges.push({
                                id: `${nodeId}-${targetId}`,
                                source: nodeId,
                                target: targetId.toString()
                            });
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error generating flow data:', error);
        }

        return { nodes, edges };
    };

    const { nodes: initialNodes, edges: initialEdges } = generateFlowData();
  
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
    return (
      <div style={{ height: "500px" }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
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
  
export default DAGGraph;
