import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getActions } from "../api"; // Adjust the import path as necessary

const ActionSelector = () => {
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  function transformPayload(action) {
    try {
      const rawPayload = JSON.parse(action.payload);
      const payloadType = {};
      const clearedPayload = {};
  
      for (const [key, value] of Object.entries(rawPayload)) {
        if (Array.isArray(value)) {
          payloadType[key] = {
            type: value[0],
            isArray: true
          };
          clearedPayload[key] = [];
        } else {
          payloadType[key] = {
            type: value,
            isArray:false
          };
          clearedPayload[key] = null; // Or "" if you prefer empty strings
        }
      }
  
      action.payloadType = payloadType;
      action.payload = JSON.stringify(clearedPayload); // Keep it as a JSON string
    } catch (e) {
      console.error("Invalid payload JSON:", e);
      action.payloadType = null;
    }
  
    return action;
  }

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActions();
        console.log(data.actions);
        // Ensure data is an array before storing
        const actionArray = Array.isArray(data.actions) ? data.actions : [];
        const transformedActions = actionArray.map(transformPayload);
        localStorage.setItem("actions", JSON.stringify(transformedActions));
        
        const stored = localStorage.getItem("actions");
        console.log(stored.actions);
        if (stored) {
          const parsedData = JSON.parse(stored);
          setCardData(Array.isArray(parsedData) ? parsedData : []);
        }
      } catch (error) {
        console.error("Error fetching actions:", error);
        setCardData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid style={{height: "100vh"}}>
      <h5>Drag and Drop an action</h5>
      <Row style={{height: "100vh"}}>
        <Col style={{ overflowY: "auto", height: "85vh" }}>
          <Row>
            {!cardData || cardData.length === 0 ? (
              <Col>
                <p className="text-muted text-center">No actions found</p>
              </Col>
            ) : (
              cardData.map((card) => (
                <Col md={6} key={card.actId} className="mb-3">
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
                    <Card.Body className="text-center">
                      <Card.Title className="h6">{card.name}</Card.Title>
                      <Card.Text>{card.message}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionSelector;