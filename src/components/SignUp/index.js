import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { singUp } from '../../actions/userActions';

import { Container, 
         Row, 
         Col, 
         Card, 
         Form,
         Alert,
         Button
         } from 'react-bootstrap';

const SignUp = props => {

  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  })
  
  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.singUp(form, props);
  }

  const showError = () => {
    if(props.error_signup){
      return( <Alert variant="danger"> {props.error_signup} </Alert> )
    }
  }

  const showLoading = () => {
    if(props.loading){
      return( <Alert variant="warning"> Cargando ..... </Alert> )
    }
  }

  return(
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title><h3>Registrarse</h3></Card.Title>
              { showError() }
              { showLoading() }
              <Form onSubmit={handleSubmit}>

                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter email address"
                    name="name"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email address"
                    name="email"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control  
                    type="password" 
                    placeholder="Ingrese la contraseña password" 
                    name="password"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Rol</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Ingrese el rol" 
                    name="role"
                    onChange={handleInput}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  <span className="sr-only">Login</span>
                </Button>

              </Form>
            </Card.Body>

            <Card.Footer>  
              <div className="small">
                <Link to="/login">Iniciar sesión</Link>
              </div>
            </Card.Footer>

          </Card>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (reducers) => {
  return reducers.userReducer;
}

const mapDispatchToProps = {
  singUp
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
