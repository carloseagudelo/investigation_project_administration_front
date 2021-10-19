import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

const Main = ({ component: Component, loading, login, ...rest }) => {
  return (
    <Route {...rest} 
      render={ props => {
        if (loading || login || localStorage.token ) {
          return ( 
            <Container>
              <Row> <Component {...props} /> </Row>
            </Container>
          )
        } else {
          return ( 
            <Redirect to="/login" /> 
          )
        }
      }
    }/>
  )
}

export default Main;
