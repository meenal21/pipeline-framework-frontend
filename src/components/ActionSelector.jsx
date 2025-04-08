import { useEffect } from "react";
import { Container } from "react-bootstrap";

const ActionSelector = () => {

useEffect(() => {
    fetch("/assets/actions.json")
      .then((res) => res.json())
      .then((data) => setCardData(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);



  return(
    <Container>

    </Container>
  )
}
