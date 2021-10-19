import React, { Component } from 'react';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Browser from './components/Browser';

import 'bootstrap/dist/css/bootstrap.min.css';

const httpLink = new HttpLink({ uri: "http://localhost:8081/graphiql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token') || null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    authMiddleware,
    httpLink
  ]),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Browser />
    </ApolloProvider>
  );
}

export default App;
