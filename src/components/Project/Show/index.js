import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Container, Row } from 'react-bootstrap';

const ProjectShow = props => (
  
  <Query query={gql`{
    project(id: "${props.match.params.id}"){
      _id
      title
      description
      status,
      user {
        name
        email
      }
    }
  }`}>

    {({ loading, error, data }) => {

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <Container>
          <Row> Título: { data.project.title } </Row>
          <Row> Descripción: { data.project.description } </Row>
          <Row> Estado: { data.project.status } </Row>
          <Row> Usuario: { data.project.user.name } </Row>
          <Row> Email: { data.project.user.email } </Row>
        </Container>
      );
    }}
    
  </Query>

)


export default ProjectShow;
