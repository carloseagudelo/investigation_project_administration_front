import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../../actions/userActions';

import { Container, 
         Row, 
         Col, 
         Card, 
         Form,
         Alert,
         Button
         } from 'react-bootstrap';

const Login = props => {

  const [form, setValues] = useState({
    email: '',
    password: ''
  })
  
  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.login(form, props);
  }

  const showError = () => {
    if(props.error_login){
      return( <Alert variant="danger"> {props.error_login} </Alert> )
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
              <Card.Title><h3>Iniciar Sesion</h3></Card.Title>
              { showError() }
              { showLoading() }
              <Form onSubmit={handleSubmit}>

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
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control  
                    type="password" 
                    placeholder="Enter password" 
                    name="password"
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
                <Link to="/signup">Regístrate</Link>
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
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
