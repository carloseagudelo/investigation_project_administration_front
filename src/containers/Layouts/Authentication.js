import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

const Authentication = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      return (
        <Container>
          <Row>
            <Component {...props} />
          </Row>
        </Container>
      )
    } }/>
  )
}

export default Authentication;
