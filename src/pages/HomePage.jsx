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
  
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  console.log("User data", userData);
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
          <Card.Img 
              variant="top" 
              src={`https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=0D8ABC&color=fff`} 
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', margin: 'auto', marginTop: '20px' }}
            /><Card.Body>
            <Card.Title className="text-center mb-3">
              {userData.firstName} {userData.lastName}
            </Card.Title>
            <Card.Text className="text-center mb-3">
              <strong>Email: </strong>{userData.email}
              <br />
              <strong>User ID: </strong>{userData.userId}
              <br />
              <strong>User Info: </strong>{userData.userInfo || 'No additional info'}
              <br />
            </Card.Text>
            <div className="d-flex justify-content-center mt-3">
              <Button className="text-center"  variant="dark" onClick={() => alert('Edit Profile')}>
                Edit Profile
              </Button>
            </div>
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