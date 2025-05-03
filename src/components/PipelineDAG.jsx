import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import { useEffect, useState, useMemo } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { updatePipeline } from '../api';
import { useNavigate } from 'react-router-dom';

const DAGGraph = ({ pipeline, id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [formData, setFormData] = useState({});
  const [payloadToSave, setPayloadToSave] = useState(null);
  const navigate = useNavigate();

  const dag = useMemo(() => {
    try {
      return typeof pipeline.dag === 'string' ? JSON.parse(pipeline.dag) : pipeline.dag;
    } catch (error) {
      console.error('Failed to parse DAG JSON:', error);
      return {};
    }
  }, [pipeline]);

  // Memoize parsedPayload to avoid recalculating on each render
  const parsedPayload = useMemo(() => {
    if (!selectedNode) return null;

    const stage = pipeline.stages.find(s => s.userStageId.toString() === selectedNode.id);
    try {
      return stage ? JSON.parse(stage.payload || '{}') : null;
    } catch (e) {
      console.error("Failed to parse payload:", e);
      return null;
    }
  }, [selectedNode, pipeline]);

  useEffect(() => {
    if (selectedNode && parsedPayload) {
      const current = formData[selectedNode.id];
      const hasChanges =
        !current ||
        Object.entries(parsedPayload).some(([key, val]) => current[key] !== val);

      if (hasChanges) {
        setFormData(prev => ({
          ...prev,
          [selectedNode.id]: {
            ...parsedPayload,
            ...prev[selectedNode.id],
          },
        }));
      }
    }
  }, [selectedNode, parsedPayload]);

  const mappedStages = Object.keys(dag).map(dagKey => {
    const stage = pipeline.stages.filter(stage => stage.userStageId === parseInt(dagKey))[0];
    if (stage) {
      return {
        ...dag[dagKey],
        stage,
      };
    } else {
      console.error(`No stage found for DAG node ID ${dagKey}`);
      return dag[dagKey];
    }
  });

  const generateFlowData = () => {
    const nodes = [];
    const edges = [];

    try {
      Object.entries(dag).forEach(([nodeId, nodeData]) => {
        if (nodeData && typeof nodeData === 'object') {
          nodes.push({
            id: nodeId,
            data: { label: nodeData.name || nodeId, type: nodeData.type || 'action', ...nodeData },
            position: nodeData.position || { x: Math.random() * 500, y: Math.random() * 300 },
          });

          if (Array.isArray(nodeData.edges)) {
            nodeData.edges.forEach((targetId) => {
              edges.push({
                id: `${nodeId}-${targetId}`,
                source: nodeId,
                target: targetId.toString(),
                style: { stroke: '#000' },
              });
            });
          }

          if (nodeData.successEdges) {
            nodeData.successEdges.forEach((targetId) => {
              edges.push({
                id: `${nodeId}-success-${targetId}`,
                source: nodeId,
                target: targetId.toString(),
                style: { stroke: '#22c55e' },
              });
            });
          }

          if (nodeData.failureEdges) {
            nodeData.failureEdges.forEach((targetId) => {
              edges.push({
                id: `${nodeId}-failure-${targetId}`,
                source: nodeId,
                target: targetId.toString(),
                style: { stroke: '#ef4444' },
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

  const handleSaveStage = () => {
    const payload = {
      pid: id,
      stages: formData,
    };
    setPayloadToSave(payload);
    setModalOpen(false);
  };

  const handleSubmit = () => {
    if (payloadToSave) {
      updatePipeline(payloadToSave)
        .then((res) => {
          if (res.status === 200) {
            alert('Pipeline updated successfully');
          }
        })
        .catch((err) => {
          console.error('Pipeline Update failed:', err);
        });
      navigate('/home');
    }
  };

  const renderModalContent = () => {
    return (
      <div>
        <Container>
          {mappedStages
            .filter((stage) => stage.stage.userStageId == selectedNode.id)
            .map((stage, index) => {
              return (
                <div key={index}>
                  <h5 className="mb-3">{stage.stage.name}</h5>
                  <Form>
                    {Object.entries(parsedPayload).map(([key, value]) => (
                      <Form.Group as={Row} className="mb-3" controlId={`form-${key}`} key={key}>
                        <Form.Label column sm="4" className="text-capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            type="text"
                            value={formData[selectedNode.id]?.[key] ?? ''}
                            placeholder={`Enter ${key}`}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                [selectedNode.id]: {
                                  ...prev[selectedNode.id],
                                  [key]: e.target.value,
                                },
                              }));
                            }}
                          />
                        </Col>
                      </Form.Group>
                    ))}
                  </Form>
                </div>
              );
            })}

          <Button variant="dark" className="me-2" onClick={() => handleSaveStage()}>
            Save
          </Button>

          <Button variant="dark" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Container>
      </div>
    );
  };

  return (
    <div style={{ height: '900px' }}>
      <Button
        variant="dark"
        style={{
          position: 'absolute',
          top: '72px',
          right: '20px',
          zIndex: 1000,
        }}
        onClick={() => handleSubmit()}
      >
        Update
      </Button>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodesDraggable
          elementsSelectable={false}
          nodesConnectable={false}
          fitView
          onNodeDoubleClick={(event, node) => {
            setSelectedNode(node);
            setModalOpen(true);
          }}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>

      {/* Modal */}
      {modalOpen && selectedNode && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              minWidth: '300px',
            }}
          >
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DAGGraph;
