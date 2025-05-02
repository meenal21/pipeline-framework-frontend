import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import { useMemo } from 'react';

const DAGGraph = ({ dagJson }) => {
  const dag = useMemo(() => {
    try {
      return typeof dagJson === 'string' ? JSON.parse(dagJson) : dagJson;
    } catch (error) {
      console.error('Failed to parse DAG JSON:', error);
      return {};
    }
  }, [dagJson]);

  console.log("DAG JSON", dag);

  const generateFlowData = () => {
    const nodes = [];
    const edges = [];

    try {
      Object.entries(dag).forEach(([nodeId, nodeData]) => {
        if (nodeData && typeof nodeData === 'object') {
          console.log("Node ID:", nodeId);

          // Add node
          nodes.push({
            id: nodeId,
            data: { label: nodeData.name || nodeId },
            position: nodeData.position || {
              x: Math.random() * 500,
              y: Math.random() * 300,
            },
          });

          // Add regular edges
          if (Array.isArray(nodeData.edges)) {
            nodeData.edges.forEach((targetId) => {
              edges.push({
                id: `${nodeId}-${targetId}`,
                source: nodeId,
                target: targetId.toString(),
                style: { stroke: '#000' }, // default black edge
              });
            });
          }

          // Add success edges for decision nodes
          if (nodeData.successEdges) {
            nodeData.successEdges.forEach((targetId) => {
              edges.push({
                id: `${nodeId}-success-${targetId}`,
                source: nodeId,
                target: targetId.toString(),
                style: { stroke: '#22c55e' }, // green edge for success
              });
            });
          }

          // Add failure edges for decision nodes
          if (nodeData.failureEdges) {
            nodeData.failureEdges.forEach((targetId) => {
              edges.push({
                id: `${nodeId}-failure-${targetId}`,
                source: nodeId,
                target: targetId.toString(),
                style: { stroke: '#ef4444' }, // red edge for failure
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
    <div style={{ height: '900px' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodesDraggable
          fitView
          // onNodeDoubleClick={handleNodeDoubleClick}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default DAGGraph;
