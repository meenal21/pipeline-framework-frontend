import react, { useState} from "react";
import FlowChart from "../components/FlowChart";
import AdjacencyList from "../components/AdjacencyList";
import {Col, Row, Container} from "react-bootstrap"



const CreatePipeline = () => {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const handleGraphUpdate = (updatedNodes, updatedEdges) => {
        setNodes(updatedNodes);
        setEdges(updatedEdges);
    };
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Container fluid className="mt-4">
      <Row style={{ height: "90vh" }}>
        {/* Left Pane (33%) */}
        <Col md={3}>
          <p>some content here</p>
        </Col>

        {/* Right Pane (66%) with 3 stacked sections */}
        <Col md={6}>
          <p>some more content</p>
          <FlowChart onGraphUpdate={handleGraphUpdate}/>
        </Col>
        <Col md={3}>
          <p>some more content</p>
          <AdjacencyList nodes={nodes} edges={edges}/>  
        </Col>
      </Row>
    </Container>
            
            
        </div>
    )
}

export default CreatePipeline;