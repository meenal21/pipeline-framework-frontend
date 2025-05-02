import { Container,Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import PipelineList from "../components/PipelineList";
import { useEffect, useState } from "react";
import { fetchPipelines } from "../api";
import PipelineXList from "../components/PipelineXList";

const HomePage = () => {
  const [pipelines, setPipelines] = useState([]);
  const [pipelinesX, setPipelinesX] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchPipelines(localStorage.getItem("userId"))
      .then((response) => {
        console.log("Fetching dashboard data", response);
        // Ensure response data is an array before setting state
        setPipelines(response.pipelines || []);
        setPipelinesX(response.pipelinesX || []);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setPipelines([]); // Set empty array on error
        setPipelinesX([]); // Set empty array on error
      }); 
  }, []);


  const handleClick = (e) =>  {
    e.preventDefault();
    navigate("/createpipeline");
    };

  return (
    <Container fluid className="mt-4">
      <Row style={{ height: "90vh" }}>
        {/* Left Pane (33%) */}
        <Col md={3}>
          <Card className="p-3 h-100">
          <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/placeholder.jpg`} />
          <Card.Body>
            <Card.Title>User Name</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            
          </Card.Body>
          </Card>
        </Col>

        {/* Right Pane (66%) with 3 stacked sections */}
        <Col md={9}>
          <Row style={{ height: "30vh" }} className="p-3">
            <Col>
              <Card className="p-3 h-100 d-flex justify-content-center align-items-center">
                <h5>Create a Pipeline</h5>
                <Button variant="dark" onClick={handleClick}>+</Button>
              </Card>
            </Col>
          </Row>
          <Row style={{ height: "30vh" }} className="p-3"> 
            <Col>
              <PipelineList pipelines={pipelines} />
            </Col>
          </Row>
          <Row style={{ height: "30vh" }} className="p-3">
            <Col>
              <PipelineXList pipelines={pipelinesX} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;