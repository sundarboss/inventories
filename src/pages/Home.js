import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Home = () => {
    return (
            <Container className='container'>
                <Row className='show-grid'>
                    <Col md={4} style={{marginBottom: '1rem'}}>
                        <Card>
                            <Card.Header>
                                Title1
                            </Card.Header>
                            <Card.Body>
                                Body of the Card
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} style={{marginBottom: '1rem'}}>
                        <Card>
                            <Card.Header>
                                Title1
                            </Card.Header>
                            <Card.Body>
                                Body of the Card
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} style={{marginBottom: '1rem'}}>
                        <Button variant='primary'>Add Item</Button>
                    </Col>
                </Row>
            </Container>
    )
}

export default Home;