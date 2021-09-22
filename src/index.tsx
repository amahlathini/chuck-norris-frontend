import React, { StrictMode } from "react";
import { render } from "react-dom";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import gql from "graphql-tag";
import "./styles.css";
import "react-awesome-button/dist/styles.css";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const client = new ApolloClient({
  uri: "https://pwwsz.sse.codesandbox.io",
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query Query {
        jokeByCategory(category: "food") {
          value
          icon_url
          id
        }
        randomJoke {
          id
          icon_url
          value
        }
        categories {
          id
          category
        }
      }
    `
  })
  .then((result) => console.log(result));

const rootElement = document.getElementById("root");
render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  rootElement
);
