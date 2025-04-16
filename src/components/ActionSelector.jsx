import { useState, useEffect, setShowModal } from "react";
import { Container, Row, Col, Card,  Button, Modal,Form } from "react-bootstrap";

const ActionSelector = () => {
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAction, setNewAction] = useState({
    id: "",
    name: "",
    input: "",
    output: "",
    file: null,
  });


  // Simulate fetching from JSON file
  // useEffect(() => {
  //   fetch(`${process.env.PUBLIC_URL}/assets/actions.json`)
  //     .then((res) => res.json())
  //     .then((data) => setCardData(data))
  //     .catch((err) => console.error("Error loading JSON:", err));
  // }, []);

  useEffect(() => {
    const stored = localStorage.getItem("actions");
    if (stored) {
      setCardData(JSON.parse(stored));
    } else {
      fetch(`${process.env.PUBLIC_URL}/assets/actions.json`)
        .then((res) => res.json())
        .then((data) => {
          setCardData(data);
          localStorage.setItem("actions", JSON.stringify(data));
        })
        .catch((err) => console.error("Error loading JSON:", err));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleFileChange = (e) => {
    setNewAction((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = () => {
    const newCard = {
      id: Date.now(),
      text: newAction.name,
      type: newAction.type,
      description: newAction.description,
      fileName: newAction.file?.name || "",
    };

    const updatedData = [...cardData, newCard];
    setCardData(updatedData);
    localStorage.setItem("actions", JSON.stringify(updatedData));

    setShowModal(false);
    setNewAction({ name: "", type: "", description: "", file: null });
  };

  return (
    <Container fluid style={{height: "100vh"}}>
      <h5>Drag and Drop an action</h5>
      
      <Row style={{height: "100vh"}}>
        {/* Cards column */}
        <Col style={{  overflowY: "auto", height: "85vh" }}>
        
          <Row>
            <Col md={6} className="mb-3">
            <Card variant="dark" onClick={() => setShowModal(true)}
                className="h-100 shadow-sm"
                  style={{ cursor: "pointer" }}>
            <Card.Body>
            <Card.Title>Add New Action</Card.Title>
            </Card.Body>
            </Card>
            </Col>
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>My First Modal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formActionName">
              <Form.Label>Action Name</Form.Label>
              <Form.Control type="text" 
              name="name"
              value={newAction.name}
              onChange={handleInputChange}
              placeholder="Enter action name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInput">
              <Form.Label>Input Parameter</Form.Label>
              <Form.Control type="text" 
              name="input"
              value={newAction.input}
              onChange={handleInputChange}
              placeholder="Enter Input Parameter" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOutput">
              <Form.Label>Output Parameter</Form.Label>
              <Form.Control type="text" 
              name="output"
              value={newAction.output}
              onChange={handleInputChange}
              placeholder="Enter Output Parameter" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFileUpload">
              <Form.Label>Upload Code File</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
            Add Action
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </Container>
    
  );
};

export default ActionSelector;