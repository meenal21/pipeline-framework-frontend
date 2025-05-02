import react, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FlowChart from "../components/FlowChart";
import AdjacencyList from "../components/AdjacencyList";
import {Col, Row, Container, Button, Form} from "react-bootstrap"
import ActionSelector from "../components/ActionSelector";
import { getActions } from "../api";



const CreatePipeline = () => {
    const [pipelineName, setPipelineName] = useState("Untitled");
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const navigate = useNavigate();
    const [pipeline, setPipeline] = useState({
      userId: localStorage.getItem("userId"),
      pName: pipelineName,
      dag: {},
      stages: []
    });

    const handlePipelineUpdate = (updatedPipeline) => {
      setPipeline(updatedPipeline);
    };

    const handleGraphUpdate = (updatedNodes, updatedEdges) => {
        setNodes(updatedNodes);
        setEdges(updatedEdges);
    };

    useEffect(() => {
      localStorage.setItem("pipelineName", pipelineName);
     
    }, [pipelineName]);

    
    const handleNextButton = (e) => {
          localStorage.setItem("pipeline", JSON.stringify(pipeline));
          navigate("/configure");
    }
    
    return (
            
      <Container fluid style={{height: "95vh"}} className='p-3'>
      <Row style={{height: "95vh"}} >
        {/* Left Pane (33%) */}
        <Col md={3}>
        
          <ActionSelector/>
        </Col>

        {/* Right Pane (66%) with 3 stacked sections */}
        <Col md={6}>
        <Form className="my-3">
          <Form.Group controlId="pipelineName">
            <Form.Control
              type="text"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
              placeholder="Enter pipeline name"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            />
          </Form.Group>
        </Form>
          <FlowChart onGraphUpdate={handleGraphUpdate}/>
        </Col>
        <Col md={3 } >
        <h5>Adjacency List</h5>
          <AdjacencyList nodes={nodes} edges={edges} pipeline = {pipeline} pipelineName = {pipelineName} onPipelineUpdate={handlePipelineUpdate}/>  
          <div className="d-flex justify-content-center">
          <Button variant='dark' onClick={handleNextButton}>Next</Button>
          </div>
        </Col>
      </Row>
    </Container>
    )
}

export default CreatePipeline;