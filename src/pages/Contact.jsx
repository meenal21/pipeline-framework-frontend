import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; 

const teamMembers = [
  {
    name: "Jyoti Singh",
    role: "Action Backend Designer",
    
    description:
      "John is our customer support lead. He's passionate about helping users solve their problems and ensuring a seamless experience.",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    name: "Meenal Jain",
    role: "Frontend Designer",
    description:
      "Jane is our product manager. She ensures that StageFlow continues to evolve and meet the needs of our users.",
    email: "jane.smith@example.com",
    image: "https://via.placeholder.com/150",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    name: "Rishika Gupta",
    role: "Backend Designer",
    description:
      "Jane is our product manager. She ensures that StageFlow continues to evolve and meet the needs of our users.",
    email: "jane.smith@example.com",
    image: "https://via.placeholder.com/150",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    name: "Shatakshi Mishra",
    role: "Action Backend Designer",
    description:
      "Emily is our marketing expert. She helps spread the word about StageFlow and ensures we're always connected to our users.",
    email: "emily.johnson@example.com",
    image: "https://via.placeholder.com/150",
    github: "https://github.com/emilyjohnson",
    linkedin: "https://linkedin.com/in/emilyjohnson",
  },
];

const ContactUsPage = () => {
  return (
    <Container className="py-5">
      <section className="mb-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-center mb-5">
          We would love to hear from you! If you have any questions, feedback, or inquiries, feel free to get in touch with our team.
        </p>

        <Row>
          {teamMembers.map((member, idx) => (
            <Col md={6} className="mb-4" key={idx}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={member.image}
                  alt={member.name}
                  className="rounded-circle mx-auto mt-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Text>{member.description}</Card.Text>
                  
                  <div className="mt-3 fs-2">
                  <a href={member.email} target="_blank" rel="noopener noreferrer">
                      <FaEnvelope />
                    </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default ContactUsPage;
