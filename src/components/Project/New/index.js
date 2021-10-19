import React, { Component, useState } from 'react';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Redirect } from 'react-router-dom';

import { Container, 
  Row, 
  Col, 
  Card, 
  Form,
  Alert,
  Button
  } from 'react-bootstrap';

const ADD_PROJECT_MUTATION = gql`
  mutation AddProject(
    $title: String!
    $description: String!
    $status: String!
  ) {
    addProject(title: $title, description: $description, status: $status) {
      _id
    }
  }
`;

const ProjectNew = props => {

  const [form, setValues] = useState({
    title: '',
    description: '',
    status: ''
  })

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const [addProject, { loading, error }] = useMutation(ADD_PROJECT_MUTATION, {
    variables: {
      title: form.title,
      description: form.description,
      status: form.status
    },
    onCompleted: () => props.history.push("/"),
    onError: (error) => console.error("Error creating a post", error),
  });

  const handleSubmit = event => {
    event.preventDefault();
    addProject();
  }

  const showError = () => {
    if(error){
      return( <Alert variant="danger"> {error} </Alert> )
    }
  }

  const showLoading = () => {
    if(loading){
      return( <Alert variant="warning"> Cargando ..... </Alert> )
    }
  }

  return(
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title><h3>Registrar Proyecto</h3></Card.Title>
              { showError() }
              { showLoading() }
              <Form onSubmit={handleSubmit}>

                <Form.Group>
                  <Form.Label>Título</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingrese el título del proyecto"
                    name="title"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Ingrese la descripción" 
                    name="description"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Estado</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Ingrese el estado" 
                    name="status"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  <span className="sr-only">Guardar</span>
                </Button>

              </Form>
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </Container>
  )

}

export default ProjectNew;
