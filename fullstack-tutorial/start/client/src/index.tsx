import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useQuery
} from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import Login from './pages/login';
import injectStyles from "./styles";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

// Initialize ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
  typeDefs
});

//   测试查询
//   client
//   .query({
//     query: gql`
//       query TestQuery {
//         launch(id: 56) {
//           id
//           mission {
//             name
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

injectStyles();

// Pass the ApolloClient instance to the ApolloProvider component
ReactDOM.render(
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>,
    document.getElementById('root')
  );