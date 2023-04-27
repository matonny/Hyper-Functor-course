import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-west-2.hygraph.com/v2/clgzcpv5j2r9t01t8crs99ja1/master",
  cache: new InMemoryCache(),
});
