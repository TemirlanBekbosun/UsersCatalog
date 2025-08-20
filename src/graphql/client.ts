import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const GET_USERS = gql`
  query GetUsers(
    $name: String
    $email: String
    $country: [String!]
    $registeredFrom: String
    $registeredTo: String
    $offset: Int
    $limit: Int
  ) {
    users(
      name: $name
      email: $email
      country: $country
      registeredFrom: $registeredFrom
      registeredTo: $registeredTo
      offset: $offset
      limit: $limit
    ) {
      id
      name
      email
      country
      registeredAt
    }
  }
`;
