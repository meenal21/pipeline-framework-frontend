import { ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge, 
    Background, 
    Controls, 
    reconnectEdge,
    getIncomers,
    getOutgoers,
    getConnectedEdges, MiniMap
 } from "reactflow";
import React, { useCallback,useState,useEffect , useRef}  from "react";
import 'reactflow/dist/style.css'
import DecisionNode from "./DecisionNode";

const initialNodes = [
  ];
const nodeTypes = { decision: DecisionNode };

const FlowChart = ({onGraphUpdate}) => {

  
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    //const [editingNode, setEditingNode] = useState(null);

    const [idCount, setIdCount] = useState(1);
    const edgeReconnectSuccessful = useRef(true);

    useEffect(() => {
        onGraphUpdate(nodes, edges);  // Update DAG whenever graph changes
    }, [nodes, edges]);


    // const onNodeDoubleClick = (event, node) => {
    //     setEditingNode({id: node.id, label: node.data.label, x: node.position.x, y: node.position.y})
    // }

    // const handleInputChange = (e) => {
    //     setEditingNode((prev) => ({...prev, label: e.target.value}))
    // }

    // const handleInputSubmit = (e) => {
    //     if (e.key === "Enter" && editingNode) {
    //       setNodes((prevNodes) =>
    //         prevNodes.map((node) =>
    //           node.id === editingNode.id ? { ...node, data: { label: editingNode.label } } : node
    //         )
    //       );
    //       setEditingNode(null); // Exit editing mode
    //     }
    //   };
      // will check every node

    const onNodesDelete = useCallback(
        (deleted) => {
          setEdges(
            deleted.reduce((acc, node) => {
              const incomers = getIncomers(node, nodes, edges);
              const outgoers = getOutgoers(node, nodes, edges);
              const connectedEdges = getConnectedEdges([node], edges);
     
              const remainingEdges = acc.filter(
                (edge) => !connectedEdges.includes(edge),
              );
     
              const createdEdges = incomers.flatMap(({ id: source }) =>
                outgoers.map(({ id: target }) => ({
                  id: `${source}->${target}`,
                  source,
                  target,
                })),
              );
     
              return [...remainingEdges, ...createdEdges];
            }, edges),
          );
        },
        [nodes, edges],
      );
    // const addNode = () => {
    //     const newNode = {
    //       id: idCount.toString(),
    //       position: { x: Math.random() * 400, y: Math.random() * 400 },
    //       data: { label: `Node ${idCount}`},
    //     };
    
    //     setNodes((prevNodes) => [...prevNodes, newNode]);
    //     setIdCount(idCount + 1);
    //   };

      const isCyclic = (start, adjList, visited, recStack) => {
        if (!visited[start]) {
          visited[start] = true;
          recStack[start] = true;
    
          if (adjList[start]) {
            for (let neighbor of adjList[start]) {
              if (!visited[neighbor] && isCyclic(neighbor, adjList, visited, recStack)) {
                return true;
              } else if (recStack[neighbor]) {
                return true;
              }
            }
          }
        }
        recStack[start] = false;
        return false;
      };
    
      const willCreateCycle = (source, target) => {
        let adjList = {};
        edges.forEach((edge) => {
          if (!adjList[edge.source]) adjList[edge.source] = [];
          adjList[edge.source].push(edge.target);
        });
    
        if (!adjList[source]) adjList[source] = [];
        adjList[source].push(target);
    
        let visited = {};
        let recStack = {};
        for (let node of nodes) {
          if (isCyclic(node.id, adjList, visited, recStack)) {
            return true;
          }
        }
        return false;
      };
    
    // const getDAG = () => {
    //     let adjList = {};
    //     nodes.forEach(node => adjList[node.id] = []); // Initialize adjacency list
    
    //     edges.forEach(edge => {
    //         adjList[edge.source].push(edge.target);
    //     });
    
    //     return adjList;
    // };
    const onConnect = useCallback(
        (params) => {
            if (willCreateCycle(params.source, params.target)) {
                alert("Cycle detected! Edge not added.");
                return;
              }
              const sourceNode = nodes.find(n => n.id === params.source);
                    if (sourceNode?.type === "decision") {
                         const existing = edges.filter(e => e.source === sourceNode.id);
                         if (existing.length >= 2) {
                             alert("Decision node can only have 2 outgoing connections.");
                             return;
                         }
                      }
            setEdges((eds) => addEdge({...params, markerEnd: { type: "arrowclosed" } }, eds))
        },

        [setEdges, edges, nodes],
    );
       
        const onReconnectStart = useCallback(() => {
          edgeReconnectSuccessful.current = false;
        }, []);
       
        const onReconnect = useCallback((oldEdge, newConnection) => {
          edgeReconnectSuccessful.current = true;
          setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
        }, []);
       
        const onReconnectEnd = useCallback((_, edge) => {
          if (!edgeReconnectSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
          }
       
          edgeReconnectSuccessful.current = true;
        }, []);

        
    return (
        <div style={{ width: '50vw', height: '90vh' , position: 'relative'}}
        onDrop={(e) => {
          e.preventDefault();
          const reactFlowBounds = e.currentTarget.getBoundingClientRect();
          const data = JSON.parse(e.dataTransfer.getData("application/reactflow"));
          console.log("Dropping data", data);
          const position = {
            x: e.clientX - reactFlowBounds.left,
            y: e.clientY - reactFlowBounds.top
          };
          const newNode = {
            id: idCount.toString(),
            position,
            type: data.flag ? "decision" : undefined,
            data: { actid: data.actId, label: data.name, payload: data.payload, payloadType: data.payloadType, flag: data.flag },
          };
          setNodes((nds) => [...nds, newNode]);
          setIdCount((prev) => prev + 1);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        }}
        >
            {/* <button onClick={addNode}>
                Add Node
            </button> */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                snapToGrid
                onNodesDelete={onNodesDelete}
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}
                onConnect={onConnect}
                defaultEdgeOptions={{ markerEnd: {type: "arrowclosed" }}}
                nodeTypes={nodeTypes}
                // onNodeDoubleClick={onNodeDoubleClick}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1}/>
            </ReactFlow>
            {/* {editingNode && (
                <input
                type="text"
                value={editingNode.label}
                onChange={handleInputChange}
                onKeyDown={handleInputSubmit}
                className="node-input"
                style={{
                    position: "absolute",
                    left: editingNode.x + 100, // Adjust position
                    top: editingNode.y + 100, // Adjust position
                    zIndex: 10
                }}
                autoFocus
                />
            )} */}
        </div>
      );
}

export default FlowChart;
