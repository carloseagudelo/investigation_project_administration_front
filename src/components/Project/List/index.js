import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { Row, Col  } from 'react-bootstrap';

const ProjectList = () => (

  <Query query={gql`{
    projects {
      _id
      title
      description
      status
    }
  }`}>

    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.projects.map(({ _id, title, description, status }) => (
        <Row> 
          <Col>
            { title } | { description } | { status } | <Link to={`/projects/${_id}`}>{title}</Link> 
          </Col>
        </Row>
      ));
    }}
    
  </Query>
)

export default ProjectList;