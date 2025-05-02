import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="py-5">
            {/* About Section */}
            <section className="mb-5">
                <h2 className="text-center mb-4">About StageFlow</h2>
                <p>
                    StageFlow is a powerful data modeling framework designed to streamline the process of creating and managing data pipelines. Our platform enables users to easily model their business processes, automate data transformations, and generate insightful reports—all without requiring extensive technical knowledge.
                </p>
                <p>
                    With StageFlow, you can focus on what matters most: making data-driven decisions that propel your business forward. Our user-friendly interface and robust features make it easy to integrate with existing systems, ensuring a seamless experience from start to finish.
                </p>
                <p>
                    StageFlow supports comprehensive ETL (Extract, Transform, Load) capabilities, allowing users to efficiently handle the full data pipeline lifecycle. You can extract data from a wide range of sources, transform it to meet business requirements, and load it into your data warehouse or reporting tools with minimal effort. 
                </p>
                <p>
                    Our flexible pipeline design allows you to customize your data workflows, making it easy to model and automate data transformations across various stages of your business process. Whether you're managing sales data, financial transactions, or customer interactions, StageFlow ensures that your data is always accurate, up-to-date, and ready for analysis.
                </p>
            </section>

            {/* Features Section */}
            <section className="mb-5">
                <h3 className="text-center mb-4">Features</h3>
                <ListGroup className="text-center">
                    <ListGroup.Item>Modular pipeline design for end-to-end business modeling</ListGroup.Item>
                    <ListGroup.Item>Scalable for both small and enterprise-level data needs</ListGroup.Item>
                    <ListGroup.Item>Automated data transformation, cleaning, and reporting</ListGroup.Item>
                    <ListGroup.Item>Intuitive UI for non-technical users</ListGroup.Item>
                    <ListGroup.Item>Supports integration with existing data sources and systems</ListGroup.Item>
                    <ListGroup.Item>Full ETL lifecycle support (Extract, Transform, Load)</ListGroup.Item>
                    <ListGroup.Item>Seamless reporting and analytics capabilities</ListGroup.Item>
                </ListGroup>
            </section>

            {/* How It Works Section */}
            <section className="mb-5">
                <h3 className="text-center mb-4">How It Works</h3>
                <p>
                    Our framework enables users to define their data models through an intuitive, drag-and-drop interface. Users can easily connect various data sources, define transformations, and create business rules without writing a single line of code. The framework automatically generates and deploys data pipelines, ensuring smooth data flow throughout the process.
                </p>
            </section>

            <section className="mb-5">
                <h3 className="text-center mb-4">How It Works</h3>
                <Row>
                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>1. Design Your Data Pipeline</Card.Title>
                                <Card.Text>
                                    Use our intuitive drag-and-drop interface to design your end-to-end data pipeline. Easily define the steps, stages, and transformations your data needs to go through, without writing a single line of code.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>2. Define Data Sources and Transformations</Card.Title>
                                <Card.Text>
                                    Connect to multiple data sources (e.g., databases, APIs, files) and define the necessary transformations to clean, filter, and aggregate the data as per your business requirements.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>3. Automate and Execute</Card.Title>
                                <Card.Text>
                                    Once your pipeline is designed, StageFlow automatically executes it on a schedule or upon request. Transformations and data loading happen seamlessly, allowing you to focus on the results, not the process.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
            {/* Use Cases Section */}
            <section className="mb-5">
                <h3 className="text-center mb-4">Use Cases</h3>
                <Row>
                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>E-Commerce Sales Pipeline</Card.Title>
                                <Card.Text>
                                    Create a pipeline to track sales data, analyze customer behavior, and forecast future trends.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Financial Reporting</Card.Title>
                                <Card.Text>
                                    Automate the extraction, transformation, and reporting of financial data for decision-making.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Healthcare Data Integration</Card.Title>
                                <Card.Text>
                                    Integrate multiple healthcare datasets for patient insights, disease tracking, and resource management.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        </Container>
    );
};

export default About;
