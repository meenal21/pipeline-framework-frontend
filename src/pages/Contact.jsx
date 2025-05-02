import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ContactUsPage = () => {
    return (
        <Container className="py-5">
            {/* Contact Us Section */}
            <section className="mb-5">
                <h2 className="text-center mb-4">Contact Us</h2>
                <p className="text-center mb-5">
                    We would love to hear from you! If you have any questions, feedback, or inquiries, feel free to get in touch with our team.
                </p>
                
                <Row>
                    {/* Team Member 1 */}
                    <Col md={6} className="mb-6">
                        <Card className="shadow-sm">
                            <Card.Img
                                variant="top"
                                src="https://via.placeholder.com/150"
                                alt="Team Member 1"
                                className="rounded-circle mx-auto mt-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <Card.Body className="text-center">
                                <Card.Title>John Doe</Card.Title>
                                <Card.Text>
                                    John is our customer support lead. He's passionate about helping users solve their problems and ensuring a seamless experience.
                                </Card.Text>
                                <Button variant="dark" href="mailto:john.doe@example.com">Email John</Button>
                                <div className="mt-3">
                                <Button variant="outline-dark" className="mx-1" href="https://www.facebook.com/emilyjohnson">
                                        Github
                                    </Button>
                                    <Button variant="outline-info" className="mx-1" href="https://www.twitter.com/emilyjohnson">
                                        Linkedin
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Team Member 2 */}
                    <Col md={6} className="mb-6">
                        <Card className="shadow-sm">
                            <Card.Img
                                variant="top"
                                src="https://via.placeholder.com/150"
                                alt="Team Member 2"
                                className="rounded-circle mx-auto mt-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <Card.Body className="text-center">
                                <Card.Title>Jane Smith</Card.Title>
                                <Card.Text>
                                    Jane is our product manager. She ensures that StageFlow continues to evolve and meet the needs of our users.
                                </Card.Text>
                                <Button variant="dark" href="mailto:jane.smith@example.com">Email Jane</Button>
                                <div className="mt-3">
                                <Button variant="outline-dark" className="mx-1" href="https://www.facebook.com/emilyjohnson">
                                        Github
                                    </Button>
                                    <Button variant="outline-info" className="mx-1" href="https://www.twitter.com/emilyjohnson">
                                        Linkedin
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Team Member 3 */}
                    <Col md={6} className="mb-6">
                        <Card className="shadow-sm">
                            <Card.Img
                                variant="top"
                                src="https://via.placeholder.com/150"
                                alt="Team Member 3"
                                className="rounded-circle mx-auto mt-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <Card.Body className="text-center">
                                <Card.Title>Emily Johnson</Card.Title>
                                <Card.Text>
                                    Emily is our marketing expert. She helps spread the word about StageFlow and ensures we're always connected to our users.
                                </Card.Text>
                                <Button variant="dark" href="mailto:emily.johnson@example.com">Email Emily</Button>
                                <div className="mt-3">
                                    <Button variant="outline-dark" className="mx-1" href="https://www.facebook.com/emilyjohnson">
                                        Github
                                    </Button>
                                    <Button variant="outline-info" className="mx-1" href="https://www.twitter.com/emilyjohnson">
                                        Linkedin
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Team Member 3 */}
                    <Col md={6} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Img
                                variant="top"
                                src="https://via.placeholder.com/150"
                                alt="Team Member 3"
                                className="rounded-circle mx-auto mt-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <Card.Body className="text-center">
                                <Card.Title>Emily Johnson</Card.Title>
                                <Card.Text>
                                    Emily is our marketing expert. She helps spread the word about StageFlow and ensures we're always connected to our users.
                                </Card.Text>
                                <Button variant="dark" href="mailto:emily.johnson@example.com">Email Emily</Button>
                                <div className="mt-3">
                                    <Button variant="outline-dark" className="mx-1" href="https://www.facebook.com/emilyjohnson">
                                        Github
                                    </Button>
                                    <Button variant="outline-info" className="mx-1" href="https://www.twitter.com/emilyjohnson">
                                        Linkedin
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        </Container>
    );
};

export default ContactUsPage;
