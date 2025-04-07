import { Container,Button, Row, Col, Card } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container fluid className="mt-4">
      <Row style={{ height: "90vh" }}>
        {/* Left Pane (33%) */}
        <Col md={3}>
          <Card className="p-3 h-100">
          <Card.Img variant="top" src="/assets/placeholder.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
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
              <Card className="p-3 h-100">
                <Container>
                <h5>Create a Pipeline</h5>
                <Button variant="primary">Go somewhere</Button>
                </Container>
              </Card>
            </Col>
          </Row>
          <Row style={{ height: "30vh" }} className="p-3"> 
            <Col>
              <Card className="p-3 h-100">
                <h5>Section 2</h5>
                <p>Some content for section 2.</p>
              </Card>
            </Col>
          </Row>
          <Row style={{ height: "30vh" }} className="p-3">
            <Col>
              <Card className="p-3 h-100">
                <h5>Section 3</h5>
                <p>Some content for section 3.</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;