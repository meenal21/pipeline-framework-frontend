import react, { useState} from "react";
import FlowChart from "../components/FlowChart";
import AdjacencyList from "../components/AdjacencyList";
import {Col, Row, Container} from "react-bootstrap"
import ActionSelector from "../components/ActionSelector";



const CreatePipeline = () => {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const handleGraphUpdate = (updatedNodes, updatedEdges) => {
        setNodes(updatedNodes);
        setEdges(updatedEdges);
    };

    
    
    return (
            
      <Container fluid style={{height: "100vh"}} className='p-3'>
      <Row style={{height: "100vh"}} >
        {/* Left Pane (33%) */}
        <Col md={3}>
        
          <ActionSelector/>
        </Col>

        {/* Right Pane (66%) with 3 stacked sections */}
        <Col md={6}>
          <FlowChart onGraphUpdate={handleGraphUpdate}/>
        </Col>
        <Col md={3}>
          <AdjacencyList nodes={nodes} edges={edges}/>  
        </Col>
      </Row>
    </Container>
    )
}

export default CreatePipeline;