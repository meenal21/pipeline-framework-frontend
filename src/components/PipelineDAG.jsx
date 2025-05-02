import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
  } from "reactflow";
  
  const DAGGraph = ({dagJson}) => {
  
    const dag = useMemo(() => JSON.parse(dagJson), []);
    
    const generateFlowData = () => {
        const nodes = Object.entries(dag).map(([id, { name, position }]) => ({
            id,
            data: { label: name },
            position: position || { x: Math.random() * 250, y: Math.random() * 250 }
          }));
  
      const edges = Object.entries(dag).flatMap(([source, targets]) =>
        targets.map((target) => ({
          id: `${source}-${target}`,
          source: source,
          target: target.toString(),
        }))
      );
  
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
