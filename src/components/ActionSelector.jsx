import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

const ActionSelector = () => {
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // Simulate fetching from JSON file
  useEffect(() => {
    fetch("/assets/actions.json")
      .then((res) => res.json())
      .then((data) => setCardData(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  return (
    <Container fluid style={{height: "100vh"}}>
      <Row style={{height: "100vh"}}>
        {/* Cards column */}
        <Col style={{  overflowY: "auto", height: "100vh" }}>
          <Row>
            {cardData.map((card) => (
              <Col md={6} key={card.id} className="mb-3">
                <Card
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("application/reactflow", JSON.stringify(card));
                  event.dataTransfer.effectAllowed = "move";
                }}
                  onClick={() => setSelectedCard(card)}
                  className="h-100 shadow-sm"
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Title>{card.text}</Card.Title>
                    <Card.Text>ID: {card.id}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionSelector;